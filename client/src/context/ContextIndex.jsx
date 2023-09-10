import React, { useContext, createContext, useState } from 'react';

// import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
// import { ethers } from 'ethers';
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// import { faker } from '@faker-js/faker'


const StateContext = createContext();

//Variable 
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};


export const StateContextProvider = ({ children }) => {

   //PAGINA GLOBAL
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#197cc8');
  const [currentMode, setCurrentMode] = useState(localStorage.getItem('themeMode'));
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [usernameRecover, setUsernameRecover] = useState();

  //Función para actualizar el color de fondo de la app
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  //Función para actualizar el color de los elementos de la app
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  //PENDIENTE DE VER COMO FUNCIONA EN LOS 4 BUTTON DEL NAVBAR
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
  
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  

  // const address = useAddress();
  // const connect = useMetamask();



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //CROWDFUNDING
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // const { contract } = useContract('0x2c0A36e01386a784B93A3cbDaeE83Ee89123De41');
  // const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  
  // const publishCampaign = async (form) => {
  //   try {
  //     const data = await createCampaign([
  //       address, // owner
  //       form.title, // title
  //       form.description, // description
  //       form.target,
  //       new Date(form.deadline).getTime(), // deadline,
  //       form.image
  //     ])

  //     console.log("contract call success", data)
  //   } catch (error) {
  //     console.log("contract call failure", error)
  //   }
  // }



  // const getCampaigns = async () => {
  //   const campaigns = await contract.call('getCampaigns');

  //   const parsedCampaings = campaigns.map((campaign, i) => ({
  //     owner: campaign.owner,
  //     title: campaign.title,
  //     description: campaign.description,
  //     target: ethers.utils.formatEther(campaign.target.toString()),
  //     deadline: campaign.deadline.toNumber(),
  //     amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
  //     image: campaign.image,
  //     pId: i
  //   }));

  //   return parsedCampaings;
  // }



  // const getUserCampaigns = async () => {
  //   const allCampaigns = await getCampaigns();

  //   const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

  //   return filteredCampaigns;
  // }


  
  // const donate = async (pId, amount) => {
  //   const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

  //   return data;
  // }



  // const getDonations = async (pId) => {
  //   const donations = await contract.call('getDonators', pId);
  //   const numberOfDonations = donations[0].length;

  //   const parsedDonations = [];

  //   for(let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: ethers.utils.formatEther(donations[1][i].toString())
  //     })
  //   }

  //   return parsedDonations;
  // }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //TINDER
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  // const { contractTinder } = useContract('0x742B455e949Ba9C5a195426e7c21f555DcD6e3f1');
  // const { mutateAsync: createTinderProfile } = useContractWrite(contractTinder, 'createTinderProfile');

  // const [cardsData, setCardsData] = useState([])
  // const [currentAccount, setCurrentAccount] = useState()
  // const [currentUser, setCurrentUser] = useState()
  // const [currentUserProfile, setCurrentUserProfile] = useState()
  // const [currentUserName, setCurrentUserName] = useState()

  // useEffect(() => {
  //   checkWalletConnection()

  //   if (address) {
  //     requestUsersData(address)
  //     requestCurrentUserData(address)
  //   }
  // }, [address])


  // const checkWalletConnection = async () => {
  //   if (address) {
  //     setCurrentAccount(address)
  //     requestToCreateUserProfile(address, faker.name.fullName())
     
  //   } else {
  //     setCurrentAccount('')
  //     console.log("Nothing user");
  //   }
  // }

  // const handleRightSwipe = async (cardData, currentUserAddress) => {
  //   const likeData = {
  //     likedUser: cardData.userWalletAddress,
  //     currentUser: currentUserAddress,
  //   }

  //   try {
  //     // http://localhost:8080
  //       await fetch('https://ia-net.onrender.com/api/v1/saveLikeRoutes', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(likeData),
  //     })

  //     // 'http://localhost:8080/
  //       const response = await fetch('https://ia-net.onrender.com/api/v1/checkMatchesRoutes', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(likeData),
  //     })
     
  //     const responseData = await response.json()


  //     const matchStatus = responseData.data.isMatch


  //      if (matchStatus) {
  //        console.log('match')

  //       const mintData = {
  //         walletAddresses: [cardData.walletAddress, currentUserAddress],
  //         names: [cardData.name, currentUserName],
  //       }

  //       // await fetch('https://ia-net.onrender.com/api/v1/mintMatchNftRoutes', {
  //         await fetch(' http://localhost:8080/api/v1/mintMatchNftRoutes', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(mintData),
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }



  // const requestToCreateUserProfile = async (walletAddress, name) => {
    
  //   try {

  //     // http://localhost:8080/
  //       await fetch('https://ia-net.onrender.com/api/v1/CreateuserTinderRoutes', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: name,
  //           userWalletAddress: walletAddress,           
  //         }),
  //       });

  //   } catch (error) {
  //     console.log("error requestToCreateUserProfile")
  //     console.log(error)
  //   }
  // }

  // const requestCurrentUserData = async walletAddress => {
  //   try {

  //     //   http://localhost:8080/
  //     const response = await fetch(
  //          `https://ia-net.onrender.com/api/v1/fetchCurrentUserDataRoutes?activeAccount=${walletAddress}`,
  //     )
      
  //     const data = await response.json()

  //     setCurrentUser(data.data);
     
  //     const ActiveUser = data.data
  //     const profileImage = ActiveUser[0].profileImage;
  //     const profileName = ActiveUser[0].name;
  //     setCurrentUserProfile(profileImage);
  //     setCurrentUserName(profileName);
  //   } catch (error) {
  //     console.log("error")
  //   }
  // }

  // const requestUsersData = async activeAccount => {
  //   try {
  //     const response = await fetch(
  //       `https://ia-net.onrender.com/api/v1/fetchUsersRoutes?activeAccount=${activeAccount}`,
  //     )
  //     const data = await response.json()

  //     setCardsData(data.data)
  //   } catch (error) {
  //     console.log("error")
  //   }
  // }


  return (
    <StateContext.Provider
      value={{ 
        //PAGINA GLOBAL
        currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings,
        usernameRecover, setUsernameRecover,
        // //WEB3
        // address,
        // connect,

        //  //CROWDFUNDING
        // contract,
        // createCampaign: publishCampaign,
        // getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations,
        

        // //TINDER
        // // contractTinder,
        // cardsData,
        // handleRightSwipe,
        // currentAccount,
        // currentUser,
        // currentUserProfile,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);