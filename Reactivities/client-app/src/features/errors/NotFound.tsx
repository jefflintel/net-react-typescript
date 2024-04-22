import { Link } from "react-router-dom"
import { Button, Header, Icon, Segment } from "semantic-ui-react"

export const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Whoops! We checked all over - We can't find what you're looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/activities">
                    Back to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}