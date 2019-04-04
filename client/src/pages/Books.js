// eslint-disable-next-line no-unused-vars
import React, {Component} from "react";
import { Col, Row, Container } from "../components/Grid";
import Axios from "axios"
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";


class Books extends Component {
    state= {
        search: "",
        books: []
    }

textInput= (event) =>{
    this.setState({
        search: event.target.value
    })
}

submitSearch= (event) => {
    event.preventDefault();
    Axios.get('https://www.googleapis.com/books/v1/volumes?q='+ this.state.search)
  .then( (response) => {
      console.log(response.data.items);
    this.setState({
        books: response.data.items
    })
  })
  .catch( (error) => {
    console.log(error);
  });
}

booksArray = ()=> {

}

    render() {
        return (
          <Container>
                <Row>
                    <Col size="md-6">
                        <form>
                            <input type ="text" name="search" onChange={this.textInput} />
                            <button type ="submit" onClick={this.submitSearch}>Search</button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-6">
                {this.state.books.length ? (
                    <List>
                {this.state.books.map((book,i )=> (
                  <ListItem key={i}>
                    <Link to={"/"}>
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </strong>
                    </Link>
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
                    </Col>
                </Row>
             
          </Container>
        );
    }
}
export default Books;