import React from "react";
import {AppLoading} from "expo";
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import * as Font from "expo-font";
import {
  Card,
  Icon,
  Header,
  Title,
  Left,
  Button,
  Body,
  Right
} from "native-base";
import {connect} from "react-redux";

const fetchFonts = () => {
  return Font.loadAsync({
    Fas: require("../assets/fonts/FascinateInline-Regular.ttf"),
    Ral: require("../assets/fonts/Raleway-Bold.ttf")
  });
};

function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goodPerformance: id =>
      dispatch({
        type: "GOOD_PERFORMANCE",
        id: id
      }),
    badPerformance: id =>
      dispatch({
        type: "BAD_PERFORMANCE",
        id: id
      })
  };
}

class EmpApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fontLoaded: false};
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() =>
            this.setState({
              fontLoaded: true
            })
          }
        />
      );
    }
    return (
      <View>
        <Header style={styles.title}>
          <Left>
            <Button transparent>
              <Icon name="menu" style={{color: "white"}} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleText}>HikeSalary</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          data={Object.values(this.props.data)}
          renderItem={({item}) => (
            <Card style={styles.container}>
              <View style={styles.idContainer}>
                <Text style={styles.idText}>{item.empid}</Text>
              </View>
              <View style={styles.nameAndSalaryContainer}>
                <Text style={styles.nameText}>Name: {item.empName}</Text>
                <Text style={styles.salaryText}>
                  Salary: {item.empSalary.toFixed()}
                </Text>
              </View>
              <View style={styles.performanceIconContainer}>
                <TouchableOpacity
                  onPress={() => this.props.badPerformance(item.empid)}
                >
                  <Icon name="ios-thumbs-down" style={styles.badPerformance} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.goodPerformance(item.empid)}
                >
                  <Icon name="ios-thumbs-up" style={styles.goodPerformance} />
                </TouchableOpacity>
              </View>
            </Card>
          )}
          keyExtractor={item => item.empid.toString()}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //list card view container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    //new style

    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20
  },
  // no. of employee container
  idContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  // no. of employee text
  idText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Ral"
  },
  // name and salary text container
  nameAndSalaryContainer: {
    flex: 4,
    padding: 20
  },
  // employee name text
  nameText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Ral"
  },
  // employee salary text
  salaryText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Ral"
  },
  // like dislike icon container
  performanceIconContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  //like icon
  goodPerformance: {
    color: "green"
  },
  // dislike icon
  badPerformance: {
    color: "red"
  },
  title: {
    backgroundColor: "#E71C23"
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Fas"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmpApp);
