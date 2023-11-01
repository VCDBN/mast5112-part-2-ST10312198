import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct library

interface Book {
  title: string;
  author: string;
  genre: string;
  numPages: string;
}

export default function App() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [genre, setGenre] = useState<string>('Fiction');
  const [numPages, setNumPages] = useState<string>('');
  const [lastBook, setLastBook] = useState<Book | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [numBooks, setNumBooks] = useState<number>(0);

  const genres = ['Fiction', 'Non-fiction', 'Mystery', 'Science Fiction', 'Fantasy'];

  const handleAddBook = () => {
    if (title && author && genre && numPages) {
      const book: Book = { title, author, genre, numPages };
      setLastBook(book);
      setTotalPages(totalPages + parseInt(numPages, 10));
      setNumBooks(numBooks + 1);

      // Clear input fields
      setTitle('');
      setAuthor('');
      setGenre('Fiction');
      setNumPages('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Tracker</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={text => setAuthor(text)}
        />
        <Picker
          selectedValue={genre}
          style={styles.input}
          onValueChange={(itemValue) => setGenre(itemValue)}
        >
          {genres.map((genre, index) => (
            <Picker.Item key={index} label={genre} value={genre} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Number of Pages"
          value={numPages}
          onChangeText={text => setNumPages(text)}
          keyboardType="numeric"
        />
        <Button title="Add Book" onPress={handleAddBook} />
      </View>

      {lastBook && (
        <View style={styles.bookDetails}>
          <Text>Last Book Read:</Text>
          <Text>Title: {lastBook.title}</Text>
          <Text>Author: {lastBook.author}</Text>
          <Text>Genre: {lastBook.genre}</Text>
          <Text>Pages: {lastBook.numPages}</Text>
        </View>
      )}

      <View style={styles.stats}>
        <Text>Total Pages Read: {totalPages}</Text>
        <Text>Average Pages per Book: {numBooks === 0 ? 0 : totalPages / numBooks}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  bookDetails: {
    marginTop: 20,
  },
  stats: {
    marginTop: 20,
  },
});

//-----Code attribution-----//
//(React Native Tutorial #3 - Designing Home Screen)//
//Available at: (https://youtu.be/n6-G3O3_FvA?si=UMVrvaGmbyopFU9j)//
//Accessed on:(22 October 2023)//

