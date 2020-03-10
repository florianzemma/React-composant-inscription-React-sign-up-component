import React from 'react';
import {Row,Col,Button,Input,Select,Card,message,Switch,Layout} from 'antd';
import {useState} from 'react'
import {GoogleOutlined,FacebookOutlined,CheckCircleOutlined} from '@ant-design/icons'



import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';


import '../App.css';



export default function Signup() {

    // Input Group Options
    const InputGroup = Input.Group;
    const { Option } = Select;

    const [googleResponse, setGoogleResponse] = useState();
    const [facebookResponse,setFacebookResponse] = useState();

    //User State
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    // Send informations to back-end for record in DB / Envoi des informations du user vers le back pour enregistrement BDD

    const userToDb = async() => {
      const data = await fetch('/inscription', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${name}&email=${email}&password=${password}`
      });
      let body = await data.json()
      
      console.log(body)

      // Error messages if user or email exist / messsage d'erreur si l'username ou l'email est existant  
      if(body.emailExist){
        message.error("Email déja existant")
      }
      if(body.usernameExist){
        message.error("Nom déja existant")
      }
      if(body.emailFormat === false){
        message.error("Email Incorrect")
      }
    }
      //Google and Facebook Login Response / Réponse Google et Facebook 
      const responseGoogle = (response) => {
     setGoogleResponse(response.getBasicProfile())
      }
      const responseFacebook = (response) => {
        setFacebookResponse(response)
      }

    return (
      <Layout style={{marginTop:70}}>
        
          <Row  id="signin">
           
           <Col span={22}>
            <Card  hoverable style={{height:500,display:"flex", flexDirection:"column",alignItems:"center",justifyContent:"center",}}>

               <Col id="inscription" xs={24} lg={12}>

                          <h2>Créer un compte</h2>

                          <GoogleLogin
                            clientId=" Votre client ID / Your client ID"
                            render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}type="danger" shape="round" > <GoogleOutlined /> Connect with Google</Button>
                          )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                          />

                          
                          <FacebookLogin
                            appId="Votre app ID / Your appID"
                            autoLoad =  {false}
                            callback={responseFacebook}
                            render={renderProps => (
                            <Button onClick={renderProps.onClick} type="primary" shape="round" ><FacebookOutlined /> Connect With Facebook</Button>
                          )}
                          />
                          
                         

                          <InputGroup style={{width:'50%',height:200,display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"center"}} compact>
                          
                          <Input 
                            onChange={(e) => setName(e.target.value)} value={name} 
                            placeholder="Nom">
                          </Input>
                          
                          <Input
                            onChange={(e) => setEmail(e.target.value)} value={email}  
                            placeholder="Email">
                          </Input>

                          <Input.Password
                            onChange={(e) => setPassword(e.target.value)} value={password}  
                            placeholder="Mot De Passe" 
                          />

                          </InputGroup>
                            <Button onClick={()=>userToDb()} type ="primary"style={{width:"40%"}}><CheckCircleOutlined/> Inscription</Button>
              </Col>
                                   
            </Card>
          </Col>
        </Row>
    </Layout>
    );
}