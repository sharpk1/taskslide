import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type KanbanCardPropsType = {
  title: string;
  id?: string;
};

const KanbanCard = ({title}: KanbanCardPropsType) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default KanbanCard;
