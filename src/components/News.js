import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
    // articles= [
    //     {
    //       "source": {
    //         "id": "espn-cric-info",
    //         "name": "ESPN Cric Info"
    //       },
    //       "author": null,
    //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //       "publishedAt": "2020-04-27T11:41:47Z",
    //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //       "source": {
    //         "id": "espn-cric-info",
    //         "name": "ESPN Cric Info"
    //       },
    //       "author": null,
    //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //       "publishedAt": "2020-03-30T15:26:05Z",
    //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    //   ]

  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }
  constructor(props){
    super(props);
    console.log("hello iam constructor form news component");
    this.state={
        // articles:this.articles,
        articles:[],
        loading:true,
        page:1,
        totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`
    
  }
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async updateNews(){
    this.props.setProgress(10);
    console.log("cdm");
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
    
    
  }
  //  handleprevclick=async()=>{
  //   console.log("previous");
  //   let url= `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);
  //   let parsedData=await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     page:this.state.page -  1,
  //     articles:parsedData.articles,
  //     loading:false
  //   })
    
  // }
  //   handlenextclick=async()=>{
  //   console.log("next");
  //   if(!(this.state.page + 1>Math.ceil(this.state.totalResults/20))){
  //     let url= `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data=await fetch(url);
  //     let parsedData=await data.json()
  //     console.log(parsedData);
  //     this.setState({
  //       page:this.state.page + 1,
  //       articles:parsedData.articles,
  //       loading:false
  //     })    

  //   }
    
    
  // }
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    this.setState({loading:true});
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults,loading:false})
  };
  render() {
    return (
      <div className='container my-4'>
              <h2 className='text-center my-3'>NewsMonkey - Top Headlines form {this.capitalizeFirstLetter(this.props.category)}</h2>
              {this.state.loading && <Spinner/>}
              <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData} 
              hasMore={this.state.articles.length!==this.state.totalResults}
              loader={<Spinner/>}
              >
                    <div className="continer">
                        <div className="row">
                            {/*!this.state.loading && this.state.art...... */}
                            {this.state.articles.map ((element)=>{
                              return <div className="col-md-4" key={element.publishedAt} >
                                              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={!element.source.name?"Unknown":element.source.name}/>
                                          </div>
                              })}     
                        </div>
                    </div>
              </InfiniteScroll>
              {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type='button' onClick={this.handleprevclick} className='btn btn-dark'>&larr; Previous</button>
                <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/20)} type='button' onClick={this.handlenextclick} className='btn btn-dark'>Next &rarr;</button>
              </div>      ------------> this is previous and next buttons to activate this uncomment handlepreviousclick and handlenextclick funtions */}
      </div>
      
    )
  }
}

export default News
