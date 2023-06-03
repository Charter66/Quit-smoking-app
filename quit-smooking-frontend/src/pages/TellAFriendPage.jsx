import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

const TellAFriendPage = () => {
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSend = () => {
    //check if friendEmail and message are not empty
    if (friendEmail && message) {
    // Simulating the sending process
      setSendSuccess(true);
    }
  };

  return (
    <div>
    <View style={styles.container}>
      <Text style={styles.title}>Tell a Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Friend's Email"
        value={friendEmail}
        onChangeText={setFriendEmail}
      /> hey do you want share it with your friend?
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <Button
        title="Send Invitation"
        onPress={handleSend}
      />
      {sendSuccess && <Text style={styles.successText}>Invitation sent successfully!</Text>}
    </View>
    </div>
  );
};

export default TellAFriendPage;
