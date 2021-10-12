import React, {useContext, useEffect} from 'react'
import {TeamContext} from "../context/teams.context";
import {Button, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {ModalContext} from "../context/modal.context";

export const Teams = () => {
  const teamContext = useContext(TeamContext);
  const modalContext = useContext(ModalContext)
  const fetchContext = async () => {
    const rawResult: Response = await fetch('http://localhost:8080/team', {
      method: "GET",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    const teams: Team[] = await rawResult.json();
    teamContext.setList(teams.sort((a, b)=>a.id-b.id))
  }
  const openTeamModal = (id: number) => {
    modalContext.setType('team')
    modalContext.setId(id);
    modalContext.setOpen(true);
  }
  useEffect(() => {
    fetchContext();
  }, [])
  return (
    <div className={"dataTable"}>
      <Text fontSize={'4xl'}>Teams</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Naam</Th>
            <Th>BatonId</Th>
            <Th/>
          </Tr>
        </Thead>
        {(teamContext?.list ?? []).map(t=>(
          <Tbody key={t.id} >
            <Tr >
              <Td>{t.id}</Td>
              <Td>{t.name}</Td>
              <Td>{t.batonId ?? "Unassigned"}</Td>
              <Td><Button colorScheme={"teal"} variant="solid" onClick={()=>openTeamModal(t.id)}>Edit</Button></Td>
            </Tr>
          </Tbody>
        ))}
        <Tfoot>
          <Tr>
            <Th>&nbsp;</Th>
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