import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { loginUser } from '../../../auth/api';
import { useAuthContext } from '../../../auth/AuthProvider';
import { LoginInput } from '../../../auth/types';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';
import { Colors } from '../../../theme/Colors';

interface SizedBoxProps {
  height?: number;
  width?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ height, width }) => {
  return <View style={{ height, width }} />;
};

const LoginScreen = () => {
  const { login } = useAuthContext();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (loginResponse) => login(loginResponse.accessToken),
  });

  const { control, handleSubmit } = useForm<LoginInput>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => mutate(data);

  return (
    <ScreenWrapper safeArea>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <SafeAreaView style={styles.safeAreaView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.content}
            >
              <Text style={styles.title}>Witaj ponownier!</Text>

              <SizedBox height={8} />

              <Text style={styles.subtitle}>Zaloguj się na swoje konto</Text>

              <SizedBox height={32} />
              <View style={styles.form}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      returnKeyType="next"
                      style={styles.textInput}
                      textContentType="username"
                      value={value}
                    />
                  )}
                />
              </View>
              <SizedBox height={16} />
              <View style={styles.form}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Hasło"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={handleSubmit(onSubmit)}
                      returnKeyType="done"
                      secureTextEntry
                      style={styles.textInput}
                      textContentType="password"
                      value={value}
                    />
                  )}
                />
              </View>
              <SizedBox height={16} />
              <SizedBox height={16} />
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Kontynuuj</Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary1,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: Colors.White1,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fca5a5',
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    color: Colors.Dark2,
    paddingHorizontal: 16,
  },
  root: {
    backgroundColor: Colors.White1,
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
  },
  textButton: {
    color: Colors.White1,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  textInput: {
    color: Colors.Dark2,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
});

export default LoginScreen;
