"use strict";
let React = require("react-native");
let { StyleSheet } = React;

const constants = {
  actionColor: "#3cb371"
};

module.exports = StyleSheet.create({
  navbar: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    height: 44,
    flexDirection: "row"
  },
  navbarTitle: {
    color: "#444",
    fontSize: 16,
    fontWeight: "500"
  },
  toolbar: {
    backgroundColor: "#fff",
    height: 22
  }
});
