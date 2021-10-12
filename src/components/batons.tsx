import React, {useState, useCallback, useEffect, useContext} from 'react'
import {BatonContext} from "../context/batons.context";
import {Button, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {ModalContext} from "../context/modal.context";

export const Batons = () => {
  const batonContext = useContext(BatonContext)
  const modalContext = useContext(ModalContext)
  const fetchBatons = async () => {
    const rawResult: Response = await fetch('http://localhost:8080/baton', {
      method: "GET",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    const batons: Baton[] = await rawResult.json();
    batonContext.setList(batons.sort((a, b)=>a.id-b.id))
  }
  const openBatonModal = (id: number) => {
    modalContext.setType('baton')
    modalContext.setId(id);
    modalContext.setOpen(true);
  }
  useEffect(()=>{
    fetchBatons().then(r => {});
  }, [])
  return (
    <div className={"dataTable"}>
      <Text fontSize={'4xl'}>Battons</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Naam</Th>
            <Th/>
          </Tr>
        </Thead>
        {(batonContext?.list ?? []).map(b=>(
          <Tbody key={b.id} >
            <Tr >
              <Td>{b.id}</Td>
              <Td>{b.name}</Td>
              <Td><Button colorScheme={"teal"} variant="solid" onClick={()=>openBatonModal(b.id)}>Edit</Button></Td>
            </Tr>
          </Tbody>
        ))}
        <Tfoot>
          <Tr>
            <Th>&nbsp;</Th>
            <Th>&nbsp;</Th>
            <Th>
              <Button colorScheme={"green"}>Add</Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  )
}