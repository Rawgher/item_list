import React, { Component } from "react";
import { ListView, Text, TouchableHighlight, View } from "react-native";
import Toolbar from "./components/Toolbar/Toolbar";
import firebaseApp from "./firebase";
const styles = require("./components/style.js");

export default class App extends Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSource: ds
    };

    // this.itemsRef = this.getRef().child("items");
    this.itemsRef = this.getRef();

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentWillMount() {
    this.getItems(this.itemsRef);
    console.log(this.getItems(this.itemsRef));
  }

  componentDidMount() {
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {
    console.log("is this happening?");
    // let items = [{ title: "Item One" }, { title: "Item Two" }];
    itemsRef.on("value", snap => {
      console.log("am i in here?");
      let items = [];
      console.log(items, "item1");
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      console.log(items, "item2");
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
