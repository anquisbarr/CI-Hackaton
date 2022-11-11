import { trpc } from "../../utils/trpc";
import { Box } from "@chakra-ui/layout";
import { TableContainer, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/table";

const CategoriesListingPage = () => {
  const { data, isLoading } = trpc.useQuery(["categories.all"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box alignItems={"center"} my={6} textAlign={'center'}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Contenido</th>
            </Tr>
          </Thead>
          <Tbody textAlign={'center'}>
            {data?.map((category) => {
              return (
                <Tr key={category.id}>
                  <Td>{category.code}</Td>
                  <Td>{category.name}</Td>
                  <Td>{category.content}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoriesListingPage;
