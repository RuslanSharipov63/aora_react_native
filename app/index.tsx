
import { View, Text, Image, } from 'react-native';
import React from 'react';
import { withExpoSnack } from 'nativewind';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { images } from "../constants";
import CustomButton from '@/components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router} from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
const StyledSafeAreaView = styled(SafeAreaView)
const StyledView = styled(View);
const StyledText = styled(Text)


function App() {
 /* const {loading, isLogged} = useGlobalContext(); */
 
const checkLogin = useGlobalContext();
if(!checkLogin?.loading && checkLogin?.isLogged) return <Redirect href="/home" />

  return (
    <StyledSafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <StyledView className="w-full flex items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <StyledView className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </StyledView>

          <StyledText className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </StyledText>
          <CustomButton 
          title="Continue with email"
          handlePress={() => router.push('/sign-in')}
          containerStyles="w-full mt-7"
          />
        </StyledView>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </StyledSafeAreaView>
  );
}

export default withExpoSnack(App);