---
title: React.native
date created: Wednesday, April 26th 2023, 5:55:21 pm
date modified: Wednesday, December 25th 2024, 12:05:35 pm
---

# React.native

![react native is composed of native mapped components](https://reactnative.dev/img/homepage/dissection-dark.png)

## Links

- [React Native](https://reactnative.dev/)
- [Create a project - Expo Documentation](https://docs.expo.dev/get-started/create-a-project/)
- [React Native Express](https://www.reactnative.express/)

## React Native Vs Expo

- React Native is an open-source mobile application framework created by Facebook for building applications for iOS and Android platforms
- Expo is a tool that enables developers to build and deploy applications using the React Native framework.
	- Expo is built on top of React Native and provides a set of APIs for making it easier to interact with device capabilities like the camera, accelerometer, and more, as well as a command-line tool to simplify the process of building, testing, and deploying your React Native application.
	- Expo is the recommend way to build react native applications

## Create to Release

### Create

- [Create a project - Expo Documentation](https://docs.expo.dev/get-started/create-a-project/)

```sh
npx create-expo-app@latest

#remove expo examples
npm run reset-project 
```

### Run on

- [Set up your environment - Expo Documentation](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local&platform=android&device=physical)
- Expo go
	- what?
		- a mobile app you have to install
	- Simple testing and non production app development
		- great when you're getting started on a project or for prototypes.
	- Command
		- `npx expo start` and then scan the QR code
- Simulator or Emulator
	- For developing apps meant for production apps
		- provide a more flexible, reliable, and complete development environment.
	- Command
		- make sure to install
			- `npx expo install expo-dev-client`
		- `npx expo run `
- Physical device
	- For developing or testing apps meant for production apps
		- This is great when testing features that require physical devices such as camera and haptics.
	- Command
		- make sure to install
			- `npx expo install expo-dev-client`
		- `npx expo run `

### Add New Library

- [Different Development Stages](https://docs.expo.dev/workflow/overview/#the-core-development-loop)
- Install a new library
	- `npx expo install package-name`
		- do not use `npm(yarn) install package-name`, because these do not allows Expo CLI to pick a compatible version of a library when possible and also warn you about known incompatibilities.
- does the library include native code?
	- [How to know if the library has native code](https://docs.expo.dev/workflow/using-libraries/#determining-third-party-library-compatibility)
	- yes
		- stop and pre-build the app `npx expo prebuild --clean`
		- run the dev server to continue `npx expo run`
	- no
		- see the changes immediately or reload the app by pressing `r` in terminal
		- if this doesn't work
			- close the app and run it again

### Production Builds

- When to use Production builds
	- To build the final release app that you intend to release to app store or google play store
- Checklists before submission
	- Before building a release app, check expo [App stores best practices - Expo Documentation](https://docs.expo.dev/distribution/app-stores/)
- Build Locally
	 - [Create a production build locally - Expo Documentation](https://docs.expo.dev/guides/local-app-production/)
 - Build with EAS
	 - EAS is cloud service which is not free, but can greatly simplify the development and release process of your app
	 - [Build your project for app stores using EAS - Expo Documentation](https://docs.expo.dev/deploy/build-project/)

### Common Commands

- `npx expo run`
	- Build a the app and then runs the development server
		- does't build the app on consecutive runs if there exists build folder(`ios` and android) folder.
			- use `npx expo prebuild --clean` to regenerate the build folders again
	- other options
		- `npx expo run:android` for running on android physical device or emulator,
		- `npx expo run:ios` for running on simulator
		- or `npx expo run:ios --device` on physical `ios` device
- `npx expo start`
	- To start the development server, doesn't build or checks for build
- `npm run reset-project`
	- You can remove the boilerplate code and start fresh with a new project
- `npx expo prebuild`
	- To modify your project's configuration or native code after the first build.
	- delete existing directories before regenerating them
		- `npx expo prebuild --clean`
	- `npx expo install expo-dev-client` must be installed for this to work.
		- this also includes useful development tools. such as
			- launcher UI
			- Improved debugging tools
			- developer menu ui
- `npx expo-doctor`
	- command line tool used to diagnose issues in your Expo project
- `npx expo install package-name`
	- Used to install a new library or validate and update specific libraries

## Main Components in Detail

### View

- The `View` component in React Native is used as a container to group and arrange other components.
	- It is used to create layout constructs.
	- It also has various props that can be used to customize its appearance and behavior.
	- it is similar to the `div` from web.

```jsx
import React from 'react';
import { View } from 'react-native';

const AppView = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        marginTop: 50,
        marginHorizontal: 20,
        padding: 10
      }}>
      <View
        style={{
          backgroundColor: 'green',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <View style={{ backgroundColor: 'yellow', padding: 10 }}>
          <View style={{ backgroundColor: 'white', height: 50, width: 50 }} />
        </View>
      </View>
    </View>
  );
};

export default AppView;
```

### Styling

- how it works?
	- All of the core components accept a prop named style.
	- Create your styles using `Stylesheet.create` and pass the styles to the style prop.
		- [StyleSheet · React Native](https://reactnative.dev/docs/stylesheet)
	- The style names and values usually match how CSS works on the web, except names are written using camel casing, e.g. backgroundColor rather than background-color.
- Tips:
	- move styles away from the render function, thus making the code easier to understand.

```jsx
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>

	  //you can pass array of styles
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```

#### Shadow

- boxShadow
	- boxShadow adds a shadow to an element, with the ability to control the position, color, size, and blurriness of the shadow.
	- Similar to how boxShadow works in css

```jsx
//in react version 0.76 and above
const styles = StyleSheet.create({
	card: {
		boyShadow: "5 5 5 0 rgba(255, 0, 0, 0.5)"
	}
})

//older react native versions
//tool for shadow generation:  https://ethercreative.github.io/react-native-shadow-generator
const styles = StyleSheet.create({
	card: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84
		elevation: 5,
	}
})
```

#### Hairline Width

- This is defined as the width of a thin line on the platform.  
- use-case:
	- It can be used as the thickness of a border or division between two elements

```jsx
const App = () => (
  <Button title="click me" onPress={...} style={styles.btn}/>
);

const styles = StyleSheet.create({
  btn: {
    padding: 4,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

```

#### Layout

##### Flex Layout

- React native uses flex which is similar to css flex for styling.
	- [Layout with Flexbox · React Native](https://reactnative.dev/docs/flexbox)
	- every component has display flex and it direction is `column` unlike web which row.
	- Check out the react native layout system to learn how styling works
		- [About Yoga | Yoga](https://www.yogalayout.dev/docs/about-yoga)
- what does `{flex: 1}`?
	- setting an element to `flex: 1`, i.e a container is a common practice that has a specific purpose in layout design.
		- Takes Up Available Space
			- similar to `flex-grow`
		- Relative Sizing
			- If one element has flex: 1 and another has flex: 2, the second element will take up twice as much space as the first.

```jsx
const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box2}>
        <Text>Box 2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // The container takes up the entire screen
    flexDirection: 'column', // Default, children are stacked vertically
  },
  box1: {
    flex: 1, // Takes up 1/3 of the container's height
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 2, // Takes up 2/3 of the container's height
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

##### Position Layout

- Position layout such as `position:absolute` and `position: relative` work just like how they are used css.

```jsx
const App = () => {
  return (
    <View style={styles.container}>
      {/* Relative Positioning */}
      <View style={styles.relativeBox}>
        <Text style={styles.text}>Relative Box</Text>
      </View>

      {/* Absolute Positioning */}
      <View style={styles.absoluteBox}>
        <Text style={styles.text}>Absolute Box</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relativeBox: {
    position: 'relative', // Default, can be omitted
    top: 20, // Moves the box 20 pixels down from its normal position
    left: 20, // Moves the box 20 pixels to the right from its normal position
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteBox: {
    position: 'absolute',
    top: 50, // Places the box 50 pixels from the top of the parent container
    right: 50, // Places the box 50 pixels from the right of the parent container
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
```

> Do not forget to consider and use SafeAreaContext when placing an element at the edges of your app screen.

### Text

- The `Text` component in React Native is used to display and style text on the screen.
- It is a basic component that renders a string of text, which can be styled using various props. The most commonly used props are `style`,
	- `numberOfLines`, and `ellipsizeMode`.
- The `style` prop is used to define the visual appearance of the text and other components.
	- It accepts an object containing various style properties such as `color`, `fontSize`, `fontWeight`, `textAlign`, `textDecorationLine`, `textShadowColor`, `textShadowOffset`, and `textShadowRadius`. With these style props, you can customize the text as per your need.

```jsx
import React from 'react';
import { Text, View } from 'react-native';

const AppText = () => {
  return (
    <View>
      <Text style={{ color: 'blue', fontSize: 24 }}>This is a text component.</Text>
    </View>
  );
};

export default AppText;
```

- The `numberOfLines` prop determines the maximum number of lines of text that can be displayed.
- The `ellipsizeMode` prop specifies what to display at the end of the truncated text when the maximum number of lines is reached.
	- The following values are available for `ellipsizeMode`:
		- `'head'`,
		- `'middle'`, and `'tail'`.

```jsx
import React from 'react';
import { Text, View } from 'react-native';

const AppText = () => {
  return (
    <View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'red', fontSize: 36 }}>
        This is a very long text that will be truncated by the `numberOfLines` prop.
      </Text>
    </View>
  );
};

export default AppText;
```

### Image

- The `source` prop of the `Image` component is used to specify the image's location, either as a string or an object with a `uri` attribute.
- Here's an example:

```jsx
import React from 'react';
import { Image, View } from 'react-native';

const ExampleApp = () => (
  <View>
    <Image
      source={{uri: 'https://picsum.photos/200/300'}} // specify the image location
      style={{width: 200, height: 300}} // specify the dimensions of the image
    />
  </View>
);

export default ExampleApp;
```

- The `Image` component also has additional props that can be used to customize its appearance and behavior.
	- These include `onLoad`, `onError`, `resizeMethod`, `resizeMode`, `borderRadius`, `overlayColor`, among others.
	- `defaultSource`, A static image to display while loading the image source.

```jsx
<Image
  source={require('./image.png')}
  style={{width: 200, height: 300}}
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed to load')}
  resizeMode="cover"
  borderRadius={10}
  overlayColor="blue"
/>


//default source example
<Image
  source={{uri: 'https://picsum.photos/200/300'}}
  style={{width: 200, height: 300}}
  defaultSource={require('./loading.png')}
  resizeMode="cover"
  borderRadius={10}
  overlayColor="blue"
/>
```

#### Image Background

- `ImageBackground` is a component that provides a way to display an image as a background to other components.
- It has the same props as `Image` and accepts any children components. However, you must specify the width and height style attributes for this component.
- Here is an example of usage of `ImageBackground`:

```jsx
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const image = { uri: 'https://reactjs.org/logo-og.png' };

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
```

### TextInput

- The `TextInput` component in React Native provides a way for the user to enter text.
- The component has various props that can be used to customize its behavior and appearance.
- Below are some prop explanations and code examples to help you understand how to use this component:

#### `onChangeText`

- This prop takes a function that will be called every time the text is changed. It provides the new text as an argument.
	- This is useful for updating state and performing other tasks as the user types.

```jsx
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const ExampleApp = () => {
  const [text, setText] = useState('');
  
  const handleTextChanged = (newText) => {
    setText(newText);
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={handleTextChanged}
        placeholder="Enter some text"
      />
    </View>
  );
};

export default ExampleApp;
```

#### `onSubmitEditing`

- This prop takes a function that will be called when the user submits the text input. This can be useful for handling form submissions or performing some other action when the user is finished entering text.

```jsx
import React from 'react';
import { Alert, TextInput, View } from 'react-native';

const ExampleApp = () => {
  const handleSubmit = () => {
    Alert.alert('Text submitted!');
  };

  return (
    <View>
      <TextInput
        onSubmitEditing={handleSubmit}
        placeholder="Enter some text and submit"
      />
    </View>
  );
};

export default ExampleApp;
```

#### `secureTextEntry`

- This prop can be set to `true` to hide the text input and show it as a password field.
	- This is useful for password and other sensitive data entry.

```jsx
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const ExampleApp = () => {
  const [password, setPassword] = useState('');
  
  const handlePasswordChanged = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <View>
      <TextInput
        value={password}
        onChangeText={handlePasswordChanged}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
    </View>
  );
};

export default ExampleApp;
```

### Pressable

- `Pressable` is a React Native component that allows a touchable area on the screen to be detected and responds by calling the specified
	- onPress,
	- onPressIn, or onPressOut callbacks, and
- here's an example:

```jsx
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const App = () => {
  const onPressInHandler = () => {
    console.log('Button is pressed in');
  };

  const onPressOutHandler = () => {
    console.log('Button is pressed out');
  };

  const onPressHandler = () => {
    console.log('Button is pressed');
  };

  return (
    <Pressable
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      onPress={onPressHandler}
    >
      {({ pressed }) => (
        <Text style={[styles.button, pressed && styles.buttonPressed]}>
          Pressable
        </Text>
      )}
    </Pressable>
  );
};

export default App;
```

> There is similar component called `TouchableOpacity`, but `Pressable` is more extensive and future-proof way to handle touch-based input

### ActivityIndicator

- `ActivityIndicator` component in React Native is a circular indicator that is used to show that some action is being performed.
- You can see this component often in cases like loading the page or loading some data.
- Here's an example of how to use the `ActivityIndicator` component in React Native.

```jsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
```

### ScrollView

- `ScrollView` is another pre-built React Native component that allows you to create scrollable content.
	- It's used to make lengthy content accessible by scrolling, either vertically or horizontally.
- Here's an example of how to use the `ScrollView` component in React Native:

```jsx
import React from 'react';
import { ScrollView, Text, Image } from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const ScrollViewComponent = () => {
  return (
    <ScrollView>
      <Text style={{fontSize: 96}}>Scroll me plz</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{fontSize: 96}}>If you like, </Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{fontSize: 96}}>Scrolling down</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{fontSize: 96}}>What's the best</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{fontSize: 96}}>Framework around?</Text>
      <Image source={logo} />
      <Image source={logo} />
      <Image source={logo} />
      <Text style={{fontSize: 80}}>React Native</Text>
    </ScrollView>
  );
};

export default ScrollViewComponent;
```

- The `ScrollView` component has a variety of props for customizing its behavior, such as `contentContainerStyle`, `onContentSizeChange`, and `snapToAlignment`. Additionally, you can use `scrollTo()` to move to a particular point in the `ScrollView`, or `scrollToEnd()` to scroll to the end.

> It should be noted that while `ScrollView` is a great option for small chunks of content, it is not suitable for large lists of data since it renders all the items concurrently, leading to sluggish performance. In such cases, it is recommended to use the `FlatList` component instead.

### FlatList

- `FlatList` is a pre-built React Native component that provides an efficient way to render and display a large list of data.
	- It has features like lazy loading, scroll loading, and the ability to render different types of data inputs.
- FlatList inherits its base props from ScrollView
- Here's an example of how to use the `FlatList` component in React Native:

```jsx
import React from 'react';
import { FlatList, Text } from 'react-native';

const FlatListComponent = () => {

  const renderFlatListItem = ({ item }) => {
    return (
      <Text>{item.title}</Text>
    );
  };

  const data = [
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
    { key: '4', title: 'Item 4' },
    { key: '5', title: 'Item 5' }
  ];

  return (
    <FlatList
      data={data}
      renderItem={renderFlatListItem}
    />
  );
};

export default FlatListComponent;
```

- The `FlatList` component also provides some useful methods,
	- such as `scrollToItem`, and `scrollToOffset`, which allows you to programmatically scroll the list to a particular item or position.
	- `onEndReached`, which can be used to implement pagination
	- `ListHeaderComponent` & `ListFooterComponnet`, which can be used to create custom header and footer around List
	- `keyboardDissMissMode`, Determines whether the keyboard gets dismissed in response to a drag.
		- set `keyboardDissMissMode = "on-drag"` then keyboard is dismissed when a drag begins.

> If you need sectioned list, there is a another react native component called [SectionList · React Native](https://reactnative.dev/docs/sectionlist)

> There is another library called [FlashList by Shopify](https://shopify.github.io/flash-list/), that has better performance and similar api compatibility

### Safe Area Context

> There is another library Called SafeAreaView from react native but it only works for `ios`

- An external library with a flexible API for accessing the device's safe area inset information.

```js
import { SafeAreaView } from 'react-native-safe-area-context';

function SomeComponent() {
  return (
    <SafeAreaView>
      <View />
    </SafeAreaView>
  );
}
```

- useSafeAreaInsets
	- Hook gives you direct access to the safe area insets. This can be useful when you want to place element(i.e Header) to safe area by setting styles like paddingTop.

```js
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ paddingTop: insets.top }} />;
}

//example two
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HookComponent() {
  const insets = useSafeAreaInsets();

  return <View style={{ position: "absolute", bottom: insets.bottom }} />;
}
```

## Examples

### Pull-to-refersh

- To implement pull to refresh functionality in a `FlatList` component in React Native, you can make use of the `RefreshControl` component provided by React Native.
- Here's an example code snippet:

```jsx
import React, { useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

### Scroll to item/index

To scroll to a specific index or item in a `FlatList` in React Native, you can use the `scrollToIndex` or `scrollToItem` method respectively. Here is an example:

```jsx
import React, { useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
  { id: '6', title: 'Item 6' },
  { id: '7', title: 'Item 7' },
  { id: '8', title: 'Item 8' },
];

const App = () => {
  const flatListRef = useRef(null);

  const scrollToIndex = () => {
    flatListRef.current.scrollToIndex({ index: 4 });
  };

  const scrollToItem = () => {
    flatListRef.current.scrollToItem({
      item: { id: '3', title: 'Item 3' },
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Scroll to Index" onPress={scrollToIndex} />
      <Button title="Scroll to Item" onPress={scrollToItem} />
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

### Platform Specific Codes

- [Platform · React Native](https://reactnative.dev/docs/platform)
- When building a cross-platform app, you'll want to re-use as much code as possible. Scenarios may arise where it makes sense for the code to be different, for example you may want to implement separate visual components for Android and iOS.

```js
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

```js
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

 - This will result in a container having flex: 1 on all platforms, a red background color on iOS, a green background color on Android, and a blue background color on other platforms.
 - Since it accepts any value, you can also use it to return platform-specific components, like below:

```js
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

- You can also use Platform to check which version of android or ios your app is running
	- [Platform Specific Code android version· React Native](https://reactnative.dev/docs/platform-specific-code#detecting-the-android-version)
	- [Platform Specific Code ios version· React Native](https://reactnative.dev/docs/platform-specific-code#detecting-the-ios-version)
- When your platform-specific code is more complex, you should consider splitting the code out into separate files. React Native will detect when a file has a .ios. or .android. extension and load the relevant platform file when required from other components.

```js
BigButton.ios.js
BigButton.android.js

import BigButton from './BigButton';

//result => React Native will automatically pick up the right file based on the running platform.
```

### Local storage/shared Preferences

- There are mainly three libraries to do this with
	- `Async Storage`
		- Provides an asynchronous, unencrypted, key-value store.
		- Async Storage is not shared between apps: every app has its own sandbox environment and has no access to data from other apps.
		- Guidelines
			- Use Async storage to store non sensitive data
				- i.e user preferences,
			- Don't use Async storage to store tokens and secrets
	- Expo secure store
		- Use it to store sensitive info like tokens and secrets
	- MMKV
		- [mrousavy/react-native-mmkv: ⚡️ The fastest key/value storage for React Native. ~30x faster than AsyncStorage!](https://github.com/mrousavy/react-native-mmkv)
		- Has significant performance advantage compared to other local key value storage options.
		- includes secure storage for sensitive data.

### Use DOM

- [Using React DOM in Expo native apps - Expo Documentation](https://docs.expo.dev/guides/dom-components/)
- While your goal should be to develop your app entrily native, there might be cases where you want to use existing react components in your app, such cases could
	- reuse existing complex web component for the sake for `mvp`
	- your desired component is not currently available natively
	- use rich text components, markdown and webGL support which are greatly supported on web
- how to use?
	- add the `use dom` directive to the top of the web component file to include a react component.
- examples

```jsx
'use dom';

export default function DOMComponent({ name }: { name: string }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
    </div>
  );
}


//inside your app.sj
import DOMComponent from './my-component.tsx';

export default function App() {
  return (
    // This is a DOM component. It re-exports a wrapped `react-native-webview` behind the scenes.
    <DOMComponent name="Europa" />
  );
}
```

- you can pass props to the `dom` component

```jsx
'use dom';

export default function DOMComponent({ hello }: { hello: string }) {
  return <p>Hello, {hello}</p>;
}


import DOMComponent from './my-component';

export default function App() {
  return <DOMComponent hello={'world'} />;
}



```

- you can pass native functions as props to the `dom` component
	- be aware
		- You cannot pass functions as nested props to DOM components. They must be top-level props.
		- If you want to pass `dom` configurations as props, use the special `dom` props
			- `DOMComponent({}: { dom: import('expo/dom').DOMProps })`
			- [Read more](https://docs.expo.dev/guides/dom-components/#webview-props)
		- for navigation, you can use the `<Link/>` component from react router. however if you want other functionality from react router i.e pathname you need to pass it as a prop.

```jsx
'use dom';

export default function MyComponent({ hello }: { hello: (data: string) => Promise<void> }) {
  return <p onClick={() => hello('world')}>Click me</p>;
}



import DomComponent from './my-component';

export default function App() {
  return (
    <DomComponent
      hello={(data: string) => {
        console.log('Hello', data);
        //or call native apis such as notification, faceID... 
      }}
    />
  );
}
```

### Concurent React Native

- [What is concurrent react](Frameworks/React/More%20on%20React.md#Concurent%20React)
- In our React Native app, we can use concurrent features to prioritize updates as urgent and non-urgent, allowing React to handle rendering more efficiently. This ensures our app remains responsive and performs well, even during complex updates.

#### Suspense

- Available starting React native(0.76) using the New Architecture
- The use hook introduced in React 19 allows you to integrate Suspense with asynchronous operations, such as fetching data from an API.
- tips
	- are you using react query? if you are using react query, react query has hook called `useSuspenseQuery` which can be used in place of react `use` hook.
	- you can use Suspense with lazy loading to show loading when using Heavy components i.e Map and Markdown

```jsx
// Main App Component
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Suspense fallback={<Text>Loading user data...</Text>}>
        <UserProfile userId="123" />
      </Suspense>
    </View>
  );
}

// Component that uses the `use` hook to await the promise
function UserProfile({ userId }) {
  const userData = use(fetchUserData(userId));
  return (
    <View style={styles.profile}>
      <Text style={styles.text}>Name: {userData.name}</Text>
      <Text style={styles.text}>Email: {userData.email}</Text>
    </View>
  );
}


// Simulate an API call
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    }, 2000); // Simulate a 2-second delay
  });
}
```

#### Transition

- Available starting React native(0.76) using the New Architecture
- These feature allow you to differentiate between **urgent updates** (e.g., user input) and **non-urgent updates** (e.g., background tasks), improving the responsiveness of the UI.

```jsx
import React, { useState, useTransition } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    // Use startTransition to mark this state update as non-blocking
    startTransition(() => {
      const filtered = ITEMS.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredItems(filtered);
    });
  };

  const handleSearchAsync = async (text: string) => {
    setSearchQuery(text);

    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const filtered = await db.getFilteredItems(inputValue);
      startTransition(() => {
        setFilteredItems(filtered);
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Transitions Example</Text>

      {/* Input for search */}
      <TextInput
        style={styles.input}
        placeholder="Type to search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Indicator for pending transition */}
      {isPending && <Text style={styles.loading}>Loading...</Text>}

      {/* Display filtered data */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
```

## Popular Libraries to Know

- for data fetching both rest & graphQL
	- [React Native | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/react-native)
	- default:
		- fetch api
- state management
	- [React Native | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/react-native)
	- alternative:
		- [Zustand documentation](https://zustand.docs.pmnd.rs/)
	- default:
		- useContext, useReducer…
- navigation
	- [Introduction to File-based Expo Router - Expo Documentation](https://docs.expo.dev/router/introduction/)
	- alternative
		- react navigation
- styling ui components
	- [NativeWind](https://www.nativewind.dev/) aka tailwind for react.native
	- default:
		- stylesheet api
- ui libraries
	- [React Native Paper](https://callstack.github.io/react-native-paper/) aka material ui for react native
- internationalization
	- react-i18next
- testing
	- jest
- animation
	- [Introduction | React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
	- [Getting started | React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- Other popular or useful libraries
	- Native menu
		- [Welcome to Zeego | Zeego](https://zeego.dev/)
			- Beautiful, native menus for React Native + Web, inspired by Radix UI.
	- Local database
		- Expo sqlite
			- Can also be integrated with [Drizzle orm for react native](https://orm.drizzle.team/docs/get-started/expo-new)
	- Char library
		- [Victory Native](https://commerce.nearform.com/open-source/victory-native/)
	- Maps
		- React Native Map components for iOS(Apple maps)+ Android(Google maps)
			- [react-native-maps - npm](https://www.npmjs.com/package/react-native-maps)
		- Mapbox
			- [React Native Mapbox | @rnmapbox/maps](https://rnmapbox.github.io/)
	- BottomSheet
		- [React Native Bottom Sheet - Gorhom](https://gorhom.dev/react-native-bottom-sheet/)
			- works with expo router, FlatList…
	- Payment subscriptions
		- [React Native | In-App Subscriptions Made Easy – RevenueCat](https://www.revenuecat.com/docs/getting-started/installation/reactnative)
	- Toast
		- [Introduction | sonner-native](https://gunnartorfis.github.io/sonner-native/)
	- SVG
		- [software-mansion/react-native-svg: SVG library for React Native, React Native Web, and plain React web projects.](https://github.com/software-mansion/react-native-svg)
	- Create blur effect
		- BlurView
			- [BlurView - Expo Documentation](https://docs.expo.dev/versions/latest/sdk/blur-view/)
			- A React component that blurs everything underneath the view.
		- Blur image Placeholder
			- [mrousavy/react-native-blurhash: 🖼️ A library to show colorful blurry placeholders while your content loads.](https://github.com/mrousavy/react-native-blurhash)
			- A blurring placeholder when showing images.
	- Share
		- share - from react native
			- For simple text based sharing you can use the native share function
				- [Share · React Native](https://reactnative.dev/docs/share)
		- React native share
			- For sharing with options such as `uri`, images and files.
				- [react-native-share/react-native-share: Social share, sending simple data to other apps.](https://github.com/react-native-share/react-native-share)
	- Alert and prompts
		- alert - from react native
			- Launches an alert dialog with the specified title and message.
			- [Alert · React Native](https://reactnative.dev/docs/alert)
			- The prompt feature is only supported on ios.
		- react native prompt
			- external library that supports prompt on both android and ios
			- [react-native-prompt-android - npm](https://www.npmjs.com/package/react-native-prompt-android)
