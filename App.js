import * as firebase from "firebase";
import React, { Component } from "react";
import { ListView, Text, TouchableHighlight, View } from "react-native";
import Toolbar from "./components/Toolbar/Toolbar";
const styles = require("./components/style.js");

const firebaseConfig = {
  apiKey: "AIzaSyDmnHDkDzUgbJZppR5I4-hIwMJAEITl9HA",
  authDomain: "item-lister-2.firebaseapp.com",
  databaseURL: "https://item-lister-2.firebaseio.com",
  projectId: "item-lister-2",
  storageBucket: "item-lister-2.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSource: ds
    };

    this.itemsRef = this.getRef().child("items");

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentWillMount() {
    this.getItems(this.itemsRef);
  }

  componentDidMount() {
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {
    // let items = [{ title: "Item One" }, { title: "Item Two" }];
    itemsRef.on("value", snap => {
      let items = [];
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item) {
    console.log(item);
  }

  renderRow(item) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.pressRow(item);
        }}
      >
        <View style={styles.li}>
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View>
        <Toolbar title="ItemLister" />
        <ListView
          dataSource={this.state.itemDataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}
