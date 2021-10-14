import React, {useContext, useEffect} from 'react'
import {TeamContext} from "../context/teams.context";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {ModalContext} from "../context/modal.context";
import {sortNumericId} from "../util";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BatonContext} from "../context/batons.context";

export const Teams = () => {
  const teamContext = useContext(TeamContext);
  const modalContext = useContext(ModalContext);
  const batonContext = useContext(BatonContext);
  const fetchTeams = async () => {
    const rawResult: Response = await fetch('http://localhost:8080/team', {
      method: "GET",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    const teams: Team[] = await rawResult.json();
    teamContext.setList(teams.sort(sortNumericId));
  }
  const openTeamModal = (id: number) => {
    const selectedTeal = teamContext.list.find(b => b.id === id);
    if (!selectedTeal) return;
    const _inputs: ModalInput[] = Object.entries(selectedTeal).map(([key, value]) => {
      const input: ModalInput = {
        name: key,
        value: value ?? '',
      }
      if (key == "id") {
        input.disabled = true;
      }
      if (key == "batonId") {
        input.options = batonContext.list.map(b=>({
          value: b.id,
          name: b.name
        }))
      }
      console.log(input)
      return input
    })
    modalContext.setInfo({
      inputs: _inputs,
      title: 'Edit Team',
      onClose: (_) => fetchTeams(),
      saveEndpoint: `http://localhost:8080/team/${id}`
    });
    modalContext.onOpen();
  }
  const deleteTeam = async (id: number) => {
    const rawResult: Response = await fetch(`http://localhost:8080/team/${id}`, {
      method: "DELETE",
      redirect: "follow"
    })
    if (!rawResult.ok) {
      //Show error or something
    }
    await fetchTeams();
  }
  useEffect(() => {
    fetchTeams();
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
            <Th>
              <Button colorScheme={"green"}>Add</Button>
            </Th>
          </Tr>
        </Thead>
        {(teamContext?.list ?? []).map(t=>(
          <Tbody key={t.id} >
            <Tr >
              <Td>{t.id}</Td>
              <Td>{t.name}</Td>
              <Td>{t.batonId ?? "Unassigned"}</Td>
              <Td>
                <Menu>
                  <MenuButton as={Button} colorScheme={'teal'} rightIcon={<ChevronDownIcon />} >
                    Edit
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={()=>openTeamModal(t.id)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={()=>deleteTeam(t.id)}>
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