import { Box } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"

export const Loading: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Spinner size='xl' color='gray.500'/>
        </Box>
    )
}

export default Loading;