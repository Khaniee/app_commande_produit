
import {Button, Card, Form, Row, Col} from 'react-bootstrap';
function Login(){
    return(
        <div style={{height : "100vh", display : "flex", justifyContent : "center", alignItems : "center", textAlign : "center"}}>
            <div className='container' style={{width : "30%"}}>
                <Card style={{ height : "20rem"}}>
                <Card.Header>Login</Card.Header>
                <Card.Body style={{display : "flex", flexDirection : "column", justifyContent : "space-between"}}>
                    <Card.Title>Connectez-vous</Card.Title>
                    <Card.Text>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                            Login
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control type='text' placeholder="Login"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                            Password
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        </Form>
                    </Card.Text>
                    <Button variant="primary" >Se connnecter</Button>
                </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default Login;