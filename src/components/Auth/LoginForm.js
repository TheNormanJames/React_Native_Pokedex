import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { user, userDetails } from '../../utils/userDB';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const [error, setError] = useState('');
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formValue) => {
      setError('');
      const { username, password } = formValue;

      if (username !== user.username || password !== user.password) {
        setError('El usuario o la contraseña no son correctos');
      } else {
        login(userDetails);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Inicia sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue('username', text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
      />

      <View style={styles.content}>
        <Button title="Entrar" onPress={formik.handleSubmit} />
      </View>

      <Text style={styles.example}>usuario: {user.username}</Text>
      <Text style={styles.example}>password: {user.password}</Text>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: '',
    password: '',
  };
}

function validationSchema() {
  return {
    username: Yup.string().required('El usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  };
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
    // marginTop: 20,
    marginBlock: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: 'center',
    color: '#f00',
    marginTop: 20,
  },
  example: {
    textAlign: 'center',
    color: '#000',
  },
});
