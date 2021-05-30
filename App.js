import React, { useState, useEffect, useCallback } from 'react'
import { Video, Audio } from 'expo-av'
import { View, Text, Alert, TextInput, Image, TouchableOpacity } from 'react-native'
import { Bubble, GiftedChat, Send, Actions, ActionsProps } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'


function Chat() {
  const [messages, setMessages] = useState([]);
  const [attachmentImage, SetAttachmentImage] = useState("")
  const [attachmentDocument, SetAttachmentDocument] = useState("")


  const pickImage = async () => {
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
    );
    if (cameraRollStatus !== 'granted') {
      alert('Sorry, Camera roll permissions not granted');
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    SetAttachmentImage(pickerResult.uri)



  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    SetAttachmentDocument(result.uri)
    console.log("result", result.uri)
  }



  useEffect(() => {
    if (attachmentImage) {

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          image: attachmentImage,

          user: {
            _id: 1,
            name: 'user',
            avatar: "https://rb.gy/0iuw75",
          },
        })
      )

    }


  }, [attachmentImage])


  useEffect(() => {
    if (attachmentDocument) {

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          document: attachmentDocument,
          user: {
            _id: 1,
            name: 'user',
            avatar: "https://rb.gy/0iuw75",

          },
        })
      )

    }


  }, [attachmentDocument])


  useEffect(() => {
    setMessages([


      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Hello Ashikh',
        createdAt: new Date(),
        // document: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540cezcon%252FCezcon-CRM-MobileApp/DocumentPicker/b646f41a-0b10-480d-9b10-a7c551b0218a.pdf",
        image: "https://rb.gy/0iuw75",
        // video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        user: {
          _id: 2,
          name: 'Admin',
          avatar: "https://rb.gy/0iuw75",
        },
      },

    ])
  }, [])

  const renderSend = (props) => {
    return (
      <Send {...props}>

        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#eb2459" />
        </View>

      </Send>
    )
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages))

  }, [])


  console.log("messages", messages)



  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#eb2459'
          }
        }}
        textStyle={{
          right: {
            color: "#fff"
          }
        }}
      />
    )
  }


  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name="angle-double-down" size={22} color="#333" />
    )
  }

  function renderActions(props) {
    return (

      <Actions
        {...props}
        options={{
          ['Send Document']: _pickDocument,
          ['Send Image']: pickImage
        }}
        icon={() => (
          <MaterialCommunityIcons name="attachment" size={22} color="#333" style={{ marginLeft: 5, marginBottom: 10 }} />
        )}
        onSend={args => console.log(args)}
      />

    )
  }

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 20 }}>
        <Video
          useNativeControls
          shouldPlay={false}
          source={{ uri: currentMessage.video }}
          style={{ height: 200, width: 250, marginLeft: -14 }}
        />
      </View>
    );
  };


  return (

    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: "user",
        avatar: "https://rb.gy/0iuw75",

      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      showUserAvatar
      renderActions={renderActions}
      isLoadingEarlier={true}
      renderUsernameOnMessage={true}
      renderMessageVideo={renderMessageVideo}



    />
  )
}
export default Chat


