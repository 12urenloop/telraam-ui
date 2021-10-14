import React, {useEffect, useContext} from 'react'
import {BatonContext} from "../context/batons.context";
import {
  Button,
  Menu,
  MenuButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  MenuList, MenuItem
} from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import {ModalContext} from "../context/modal.context";
import {sortNumericId} from "../util";

export const Batons = () => {
  const batonContext = useContext(BatonContext);
  const modalContext = useContext(ModalContext);
  const fetchBatons = async () => {
    const rawResult: Response = await fetch('http://localhost:8080/baton', {
      method: "GET",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    const batons: Baton[] = await rawResult.json();
    batonContext.setList(batons.sort(sortNumericId));
  }
  const openBatonModal = (batonId: number) => {
    const selectedBaton = batonContext.list.find(b => b.id === batonId);
    if (!selectedBaton) return;
    const _inputs: ModalInput[] = Object.entries(selectedBaton).map(([key, value]) => {
      const input: ModalInput = {
        name: key,
        value,
      }
      if (key == "id") {
        input.disabled = true;
      }
      return input
    })
    modalContext.setInfo({
      inputs: _inputs,
      title: 'Edit Baton',
      onClose: (_) => fetchBatons(),
      saveEndpoint: `http://localhost:8080/baton/${batonId}`
    });
    modalContext.onOpen();
  };
  const deleteBaton = async (id: number) => {
    const rawResult: Response = await fetch(`http://localhost:8080/baton/${id}`, {
      method: "DELETE",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    await fetchBatons();
  }
  useEffect(()=>{
    fetchBatons().then(r => {});
  }, [])
  return (
    <div className={"dataTable"}>
      <Text fontSize={'4xl'}>Batons</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Naam</Th>
            <Th>
              <Button colorScheme={"green"}>Add</Button>
            </Th>
          </Tr>
        </Thead>
        {(batonContext?.list ?? []).map(b=>(
          <Tbody key={b.id} >
            <Tr >
              <Td>{b.id}</Td>
              <Td>{b.name}</Td>
              <Td>
                <Menu>
                  <MenuButton as={Button} colorScheme={'teal'} rightIcon={<ChevronDownIcon />} >
                    Edit
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={()=>openBatonModal(b.id)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={()=>deleteBaton(b.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </div>
  )
}