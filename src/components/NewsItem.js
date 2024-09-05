import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={imageUrl?imageUrl:"https://www.usatoday.com/gcdn/authoring/authoring-images/2024/08/27/USAT/74960728007-149686067.jpg?crop=4781,2689,x0,y128&width=3200&height=1800&format=pjpg&auto=webp"} alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
  </span></h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
