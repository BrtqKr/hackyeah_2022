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
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { loginUser } from '../../../auth/api';
import { useAuthContext } from '../../../auth/AuthProvider';
import { LoginInput } from '../../../auth/types';
import ScreenWrapper from '../../../components/shared/ScreenWrapper';
import { Colors } from '../../../theme/Colors';
import LeafSvg from '../../../../svgs/Svg';
import LogoSvg from '../../../../svgs/BgkSvg';
import { Typography } from '../../../theme/Typography/Typography';

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
    onSuccess: (loginResponse) => {
      login(loginResponse.jwt);
    },
  });

  const { control, handleSubmit } = useForm<LoginInput>({
    mode: 'onBlur',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => mutate(data);

  return (
    <ScreenWrapper safeArea style={{ paddingHorizontal: 24 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <View style={styles.logoWrapper}>
              <View style={styles.logo}>
                <LeafSvg />
              </View>
              <Text style={[Typography.text1, styles.logoWrapperText]}>Sustainify</Text>
            </View>

            <Text style={[Typography.text1, styles.logoWrapperText, { marginBottom: 8 }]}>
              Hi there!
            </Text>

            <Text
              style={[
                Typography.text1,
                { color: Colors.Secondary4, marginBottom: 16, fontSize: 20 },
              ]}
            >
              Ready for a new challenge?
            </Text>

            <View style={styles.form}>
              <Controller
                control={control}
                name="identifier"
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
                    placeholderTextColor={Colors.Secondary3}
                  />
                )}
              />
            </View>
            <View style={styles.form}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType="done"
                    secureTextEntry
                    style={[styles.textInput, { marginBottom: 20 }]}
                    textContentType="password"
                    value={value}
                    placeholderTextColor={Colors.Secondary3}
                  />
                )}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Log in</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ alignSelf: 'flex-end', marginRight: 24 }}>
        <LogoSvg />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.Primary1,
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
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
    paddingTop: 0,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  form: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    height: 48,
    color: Colors.Dark2,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.Secondary3,
    marginBottom: 16,
  },
  root: {
    backgroundColor: '#FFF',
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary1,
    marginBottom: 8,
  },
  logoWrapperText: {
    fontSize: 26,
    color: Colors.Secondary3,
  },
  logoWrapper: {
    alignSelf: 'center',
    marginBottom: 100,
    alignItems: 'center',
  },
});

export default LoginScreen;
