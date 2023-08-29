import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import KanbanColumn from '../organism/KanbanColumn';

const KanbanBoard = () => {
  // Dummy data
  const columns = [
    {
      id: 'col1',
      title: 'To Do',
      cards: [
        {id: '1', title: 'Task 1'},
        {id: '2', title: 'Task 2'},
      ],
    },
    {
      id: 'col2',
      title: 'Doing',
      cards: [{id: '3', title: 'Task 3'}],
    },
    // ... add more columns
  ];

  return (
    <ScrollView horizontal style={styles.board}>
      <View style={styles.columnContainer}>
        {columns.map(column => (
          <KanbanColumn key={column.id} {...column} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  board: {
    margin: 5,
  },
  columnContainer: {
    flexDirection: 'row',
  },
});

export default KanbanBoard;
