import React,{useState,useEffect} from "react";
import Spinner from "../Spinner"
import {
  GridRow,
  Header,
  Form,
  FormField,
  Checkbox,
  Input,
  Button,
  Grid,
  Image,
  Message,
  MessageHeader
} from "semantic-ui-react";
import Login_img from "../Images/Login_img.jpg";
import { login} from "../../Firebase";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";



function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = 'E-mail is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
       try {
         const userCredential = await login(dispatch, formData.email, formData.password);
         if (userCredential) {
           navigate("/");
           setFormData({
             username: "",
             email: "",
             password: "",
             confirmPassword: "",
            });
            setErrors({});
          }
        } catch (error) {
          // Handle error if needed
        } 
  }
  };

  return (
    <>
    <Grid className="login ui middle aligned center aligned grid">
      <div className="column">
        <div className="ui violet image header">
          <Image src={Login_img} size="massive" circular />
          <h1> Login To ChatApp</h1>
        </div>
        <Form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <FormField>
              <Input
                icon="mail"
                size="large"
                iconPosition="left"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <Input
                icon="lock"
                size="large"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormField>
            <Button color="violet" fluid type="submit">
              Submit
            </Button>
          </div>
          <div className={`ui error message${Object.keys(errors).length > 0 ? ' visible' : ''}`}>
          <ul className="error-list">
          {Object.values(errors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
          </div>
        </Form>
        <Message size="small">
          Don't have an account?
          <a href="/signup">Signup</a>
        </Message>
      </div>
    </Grid>
    </>

  );
}

export default Login;
