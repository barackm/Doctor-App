import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import colors from '../../config/colors';
import { connect } from 'react-redux';
import Screen from '../../components/Screen';
import Testitem from './TestItem';
import {
  loadPetientTests,
  loadTests,
  removeTest,
} from '../../store/reducers/tests';

const TestHistoryScreen = ({ tests, loadTests, loading, removeTest }) => {
  useEffect(() => {
    loadTests();
  }, []);
  const handleRemoveTest = (t) => {
    Alert.alert(
      'Are you sure you want to delete this test?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            removeTest(t._id);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        data={tests}
        onRefresh={loadTests}
        refreshing={loading}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <Testitem test={item} onRemoveTest={handleRemoveTest} />
        )}
        style={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.noTestsContainer}>
            <Text style={styles.noTest}>No tests Found, Pull to refresh</Text>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.light,
    position: 'relative',
    paddingBottom: 10,
  },
  list: {
    flex: 1,
  },
  noTestsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 50,
  },
  noTest: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.medium,
  },
});

const mapStateToProps = (state) => {
  return {
    tests: state.entities.tests.list,
    loading: state.entities.tests.loading,
  };
};
const mapDispatchToProps = {
  loadTests: () => loadTests(),
  loadPetientTests: (id) => loadPetientTests(id),
  removeTest: (id) => removeTest(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(TestHistoryScreen);
