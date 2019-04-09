import React, { Component } from "react";
import { ListView, TouchableHighlight, View } from "react-native";
import Toolbar from "./components/Toolbar/Toolbar";
const styles = require("./components/style.js");

export default class App extends Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemDataSource: ds
    };

    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  componentWillMount() {
    this.getItems;
  }

  componentDidMount() {
    this.getItems;
  }

  getItems() {
    let items = [{ title: "Item One" }, { title: "Item Two" }];

    this.setState({
      itemDataSource: this.state.itemDataSource.cloneWithRows(items)
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
