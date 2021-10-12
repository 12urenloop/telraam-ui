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
import {TeamContext} from "../context/teams.context";

export const TeamModal: React.FC = props => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const modalContext = useContext(ModalContext)
  const teamContext = useContext(TeamContext)
  const [currentTeam, setTeam] = useState<Team>({name: "", id: 0, batonId: 0});
  useEffect(() => {
    if (modalContext.type !== "team") return;
    if (!modalContext?.id) return;
    const modalTeam = teamContext.list.find(b => b.id === modalContext.id);
    if (!modalTeam) return;
    setTeam(modalTeam);
  }, [teamContext, modalContext])
  const changeTeamValue = (key: string, value: any) => {
    setTeam({
      ...currentTeam,
      [key]: value
    })
  }
  const pushUpdate = async () => {
    const rawResult: Response = await fetch(`http://localhost:8080/team/${currentTeam.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentTeam)
    })
    const data = await rawResult.json();
    teamContext.setList([...teamContext.list.filter(b=>b.id !== currentTeam.id), data])
    modalContext.setOpen(false)
  }
  const deleteTeam = async () => {
    const rawResult: Response = await fetch(`http://localhost:8080/team/${currentTeam.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await rawResult.json();
    if(!data) {
      // Add error popup
    }
    teamContext.setList([...teamContext.list.filter(b=>b.id !== currentTeam.id)])
    modalContext.setOpen(false)
  }
  return ( modalContext.type === "team" && currentTeam) ? (
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
            <Input disabled value={currentTeam.id} />
          </FormControl>
          <FormControl>
            <FormLabel>Naam</FormLabel>
            <Input placeholder={"Naam"} value={currentTeam.name} onChange={(e)=>changeTeamValue('name', e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Naam</FormLabel>
            <Input placeholder={"BatonId"} value={currentTeam.batonId} onChange={(e)=>changeTeamValue('batonId', e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={pushUpdate}>
            Save
          </Button>
          <Button colorScheme="red" mr={3} onClick={deleteTeam}>Delete</Button>
          <Button onClick={()=>modalContext.setOpen(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null
}