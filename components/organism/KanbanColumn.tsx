import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import KanbanCard from '../molecules/KanbanCard';

type KanbanColumnPropsType = {
  title: string;
  cards?: any;
};

const KanbanColumn = ({title, cards}: KanbanColumnPropsType) => {
  return (
    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>
      {cards.map(card => (
        <KanbanCard key={card.id} {...card} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default KanbanColumn;
