import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useEnv } from "../context/env.context";

export const useExternalAPI = () => {
  const { apiServerUrl, axios } = useEnv();
  const { logout } = useAuth();

  axios.interceptors.response.use(
    function (response) {
      response.data = {
        success: true,
        "message": "Successfully logged in",
        data: {
          "title": "Mr.",
          "school": null,
          "fullschoolname": "",
          "schoollogo": {
            "imageurl": "",
            "imagetype": ""
          },
          "fullareaofp": [
            {
              "id": 3,
              "fullname": "Advertising",
              "extras": null
            },
            {
              "id": 1,
              "fullname": "Administrative Law",
              "extras": null
            }
          ],
          "fullchamber": {
            "name": "1St Law",
            "rep": "Mr. Joseph Aboagye Debrah",
            "location": "28/1,Castle Road, Adabraka"
          },
          "fullchapter": [
            {
              "id": 1,
              "fullname": "Greater Accra Chapter",
              "extras": null
            },
            {
              "id": 6,
              "fullname": "Eastern Region Chapter",
              "extras": null
            }
          ],
          "fullprovice": {
            "id": 1,
            "adminname": "Greater Accra",
            "city": "Accra",
            "extras": null
          },
          "areaofpractice": "[\"3\",\"1\"]",
          "chapter": "[\"1\",\"6\"]",
          "chamber": "2",
          "province": "1",
          "region": "AA",
          "fullregionname": "Greater Accra",
          "typeofuser": "LAWYER",
          "firstname": "ISAAC",
          "lastname": "BEKOE",
          "othername": "KOJO",
          "emailaddress": "iziqbek@gmail.com",
          "isemailverified": true,
          "phonenumber": "+233 203 477 216",
          "isphonenumberverified": false,
          "devicehasbiometriclogin": false,
          userpaymentdata: {
            "madeallpayment": true,
            "allpaymentpaid": [],
            "allpaymentunpaid": []
          },
          "membershipid": "AA-15157-22",
          "userapproved": true,
          "otherstudentdata": "{}",
          "otherlawyerdata": "{}",
          "yearofcall": "2015",
          "gender": "Male"
        }
      };
      
      if (response?.data?.message === "Un-authenticated!") {
        logout();
        return;
      }
      return response;
    },
    function (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === "Un-authenticated!"
      ) {
        logout();
        return;
      }

      // console.log("Intercept: ", error?.response?.data.message);

      return {
        success: false,
        message:
          error?.message === "Network Error"
            ? error?.message
            : error?.response?.data.message,
      };
    }
  );

  const makeRequest = async (options) => {
    try {
      const response = await axios({ ...options.config, timeout: 15000 });
      // console.log("Response: ", response);
      return response.data || response;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  };
  const getDashboardData = async () => {
    const config = {
      url: `${apiServerUrl}/api/adminaction1/dashboardsummary`,
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({ config });

    return data;
  };
  const getOTP = async (email) => {
    const config = {
      url: `${apiServerUrl}/api/auth/precheck`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        emailaddress: email,
      },
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const verifyEmail = async (email, otp) => {
    const config = {
      url: `${apiServerUrl}/api/auth/emailotpverify`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        emailaddress: email,
        otpcode: otp,
      },
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const addPendingAccount = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/adduserpending`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: { ...userData, typeofuser: userData.typeofuser.toUpperCase() },
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getSchools = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchuniversities`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getRegions = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchregions`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getArea = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchareasofpractise`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getChapter = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchchapters`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getChamber = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchchambers`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const getProvince = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/general/fetchprovinces`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        id: "1",
        statusresponse: "APPROVE",
      },
    };

    const data = await makeRequest({
      config,
    });
    
    return data;
  };

  const loginUser = async (loginData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/webuserlogin`,
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: loginData,
    };

    const data = await makeRequest({ config });
    console.log("Log having: ", data);

    return data;
  };

  const loginOutUser = async (loginData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/logout`,
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {},
    };

    const data = await makeRequest({ config });

    // console.log("Log having: ", data)
    if (data.success) 
    logout();

    return null;
  };

  const getResetOTP = async (email) => {
    const config = {
      url: `${apiServerUrl}/api/auth/initpasswordreset`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {
        emailaddress: email,
      },
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const passwordReset = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/passwordreset`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
      // withCredentials: true,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const queryPaymentAccount = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/payment/getaccountname`,
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const makeUserPayment = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/payment/makeuserpayment`,
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const checkMomoStatus = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/payment/checkmomotransstaus`,
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };

  const changeProfile = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/updateprofilepicture`,
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };
  const fetchTransactions = async (feeData) => {
    const config = {
      url: `${apiServerUrl}/api/payment/gettranssummary`,
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: {}
    };

    const data = await makeRequest({ config });

    return data;
  };
  const chaneProfileData = async (userData) => {
    const config = {
      url: `${apiServerUrl}/api/auth/updateuserprofile`,
      method: "POST",
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      data: userData,
    };

    const data = await makeRequest({
      config,
    });

    return data;
  };
  return {
    getOTP,
    verifyEmail,
    getSchools,
    addPendingAccount,
    loginUser,
    loginOutUser,
    getResetOTP,
    passwordReset,
    getRegions,
    getArea,
    getChapter,
    getChamber,
    getProvince,
    queryPaymentAccount,
    makeUserPayment,
    changeProfile,
    checkMomoStatus,
    chaneProfileData,
    getDashboardData,
    fetchTransactions
  };
};
