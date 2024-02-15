import React, { useEffect,useState } from "react";
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
  MessageHeader,
} from "semantic-ui-react";
import Login_img from "../Images/Login_img.jpg";
import { createUser ,onAuthStateChanged ,addUserToFirestore} from "../../Firebase";
import { auth} from '../../Firebase';
import { setUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'E-mail is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Password is not matched';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Register the user using Firebase authentication
        const userCredential = await createUser(formData.email, formData.password);
        
        // // Store additional user information in Firestore
        await addUserToFirestore(userCredential.user.uid, formData.username,formData.email)
      navigate("/login");

        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (error) {
        // console.error('Registration error:', error.message);
        setErrors({ firebase: [error.message] });
      }
    }
  };

  // check for userDetails
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     dispatch(setUser(user));
  //   });
    
  //   return () => unsubscribe();
  // }, [dispatch]);

  return (
    <Grid className="login ui middle aligned center aligned grid">
      <div className="column">
        <div className="ui orange image header">
          <Image src={Login_img} size="massive" circular />
          <h1> Login To ChatApp</h1>
        </div>
        <Form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <FormField>
              <Input
                icon="user"
                size="large"
                iconPosition="left"
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormField>
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
            <FormField>
              <Input
                icon="redo"
                size="large"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormField>
            <Button color="orange" fluid type="submit">
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
          Already a user?
          <a href="/login">Login</a>
        </Message>
      </div>
    </Grid>
  );
}

export default Register;
