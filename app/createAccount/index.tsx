import PrimaryButton from "@/components/PrimaryButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  // Button,
  Image,
  // Pressable,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createAccount as createAccount2 } from "@/redux/userSlice";
import Input from "@/components/Input";
import DismissKeyboard from "@/components/DismissKeyboard";
import { router } from "expo-router";
import Logo from "@/components/logo";
import ThemedText from "@/components/ThemedText";
// import { launchImageLibrary } from "react-native-image-picker";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

export default function CreateAccount() {
  const theme = useThemeColor();
  // const [photo, setPhoto] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  const { accountCreateLoader, accountCreatedSuccessfully, otpId } =
    useAppSelector((store) => store.userFeatures);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      passwordHash: "",
      image: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(createAccount2({ formValues: { ...values }, otpId: otpId }));
    },
  });
  const { values, handleChange, handleBlur, errors, handleSubmit, touched } =
    formik;

  // const options: any = {
  //   mediaType: "photo",
  //   includeBase64: false,
  //   maxHeight: 2000,
  //   maxWidth: 2000,
  // };

  // const handleChoosePhoto = () => {
  //   launchImageLibrary(options, (response) => {
  //     // console.log(response);
  //     if (response) {
  //       setPhoto(response);
  //     }
  //   });
  // };

  // const handleUploadPhoto = () => {
  //   fetch(`${SERVER_URL}/api/upload`, {
  //     method: 'POST',
  //     body: createFormData(photo, { userId: '123' }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log('response', response);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // };

  useEffect(() => {
    if (accountCreatedSuccessfully) {
      router.replace("/(tabs)");
    }
  }, [accountCreatedSuccessfully]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: "10%",
        paddingHorizontal: "10%",
      }}
    >
      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={{ width: "100%", gap: 10 }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              gap: 40,
            }}
          >
            <Logo />
            <ThemedText
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: theme.PrimaryTextColor,
                textAlign: "center",
              }}
            >
              Get started by creating an account!
            </ThemedText>
          </View>
          <Input
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            placeholder="First Name"
            error={
              errors.firstName && touched.firstName ? errors.firstName : ""
            }
          />
          <Input
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            placeholder="Last Name"
            error={errors.lastName && touched.lastName ? errors.lastName : ""}
          />

          <Input
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            value={values.phoneNumber}
            type="phone-pad"
            placeholder="phone number"
            error={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : ""
            }
          />

          <Input
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            placeholder="Email"
            error={errors.email && touched.email ? errors.email : ""}
          />

          <Input
            onChangeText={handleChange("passwordHash")}
            onBlur={handleBlur("passwordHash")}
            value={values.passwordHash}
            placeholder="Password"
            error={
              errors.passwordHash && touched.passwordHash
                ? errors.passwordHash
                : ""
            }
          />

          {/* {photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title="Upload Photo" onPress={handleUploadPhoto} />
            </>
          )} */}

          {/* <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: theme.primary,
              marginVertical: 5,
            }}
          >
            Choose Profile Photo :
            <Pressable onPress={handleChoosePhoto}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.primary,
                  textDecorationLine: "underline",
                  marginBottom: -3,
                }}
              >
                {" "}
                Upload
              </Text>
            </Pressable>
          </Text> */}

          <PrimaryButton
            title="Create Account"
            disabled={accountCreateLoader}
            onPress={() => {
              dispatch(
                createAccount2({ formValues: { ...values }, otpId: otpId })
              );
            }}
            customStyle={{ width: "100%" }}
          />
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </View>
  );
}
