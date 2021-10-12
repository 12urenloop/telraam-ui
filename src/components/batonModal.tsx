import React, {useContext, useEffect, useState} from 'react'
import {
  Button, FormControl, FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import {ModalContext} from "../context/modal.context";
import {BatonContext} from "../context/batons.context";

export const BatonModal: React.FC = props => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const modalContext = useContext(ModalContext)
  const batonContext = useContext(BatonContext)
  const [currentBaton, setBaton] = useState<Baton>({name: "", id: 0});
  useEffect(() => {
    if (modalContext.type !== "baton") return;
    if (!modalContext?.id) return;
    const modalBaton = batonContext.list.find(b => b.id === modalContext.id);
    if (!modalBaton) return;
    setBaton(modalBaton);
  }, [batonContext, modalContext])
  const changeBatonValue = (key: string, value: any) => {
    setBaton({
      ...currentBaton,
      [key]: value
    })
  }
  const pushUpdate = async () => {
    const rawResult: Response = await fetch(`http://localhost:8080/baton/${currentBaton.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentBaton)
    })
    const data = await rawResult.json();
    batonContext.setList([...batonContext.list.filter(b=>b.id !== currentBaton.id), data])
    modalContext.setOpen(false)
  }
  const deleteBaton = async () => {
    const rawResult: Response = await fetch(`http://localhost:8080/baton/${currentBaton.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await rawResult.json();
    if(!data) {
      // Add error popup
    }
    batonContext.setList([...batonContext.list.filter(b=>b.id !== currentBaton.id)])
    modalContext.setOpen(false)
  }
  return ( modalContext.type === "baton" && currentBaton) ? (
    <Modal
      isOpen={modalContext.isOpen}
      onClose={()=>modalContext.setOpen(false)}
      blockScrollOnMount={true}
      isCentered
      // Needed for auto close when clicking outside modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      motionPreset={"scale"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Batton data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>
              ID
            </FormLabel>
            <Input disabled value={currentBaton.id} />
          </FormControl>
          <FormControl>
            <FormLabel>Naam</FormLabel>
            <Input placeholder={"Naam"} value={currentBaton.name} onChange={(e)=>changeBatonValue('name', e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={pushUpdate}>
            Save
          </Button>
          <Button colorScheme="red" mr={3} onClick={deleteBaton}>Delete</Button>
          <Button onClick={()=>modalContext.setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null
}