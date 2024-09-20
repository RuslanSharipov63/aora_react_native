import { Text, Image, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler';
import { images } from "../../constants";
import FormField from '@/components/FormField';
import CustomButton from './../../components/CustomButton';
import { Link, router } from "expo-router";
/* import { createUser } from '../../lib/appwrite'; */
import { createUser } from '@/lib/back';
const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

const showAlert = (param: string) => {
  Alert.alert("Error", param);
}

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {

    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    /* set it glonbal state */
   // router.replace('/home');
    try {
     /*  const result = await createUser(form.email, form.password, form.username); */
     const result = await createUser(form.email, form.password, form.username);
     if(result === 'email уже существует') {
     await showAlert("The email already exists");
     /*  Alert.alert("Error", "The email already exists"); */
      return;
     }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center min-h-[83vh] px-4 my-6"
        >
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>
          <FormField
            title="Email"
            placeholder="email"
            value={form.email}
            handleChangeText={(e: any) => setForm({
              ...form, email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({
              ...form, password: e
            })}
            otherStyles="mt-7"
          />
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({
              ...form, username: e
            })}
            otherStyles="mt-10"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}
export default SignUp;


