import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const colleges = [
  {
    name: "IIT Madras - Indian Intitute of Technology -[IITM], Chennai",
    course_fees: 15000,
    user_reviews: 8.5,
    placements: {
      average_package: "₹8,00,000",
      highest_package: "₹25,00,000",
    },
    ranking: 5,
    featured: true,
  },
  {
    name: "IIT Delhi - Indian Institute of Technology[IITD], New Delhi",
    course_fees: 12000,
    user_reviews: 7.8,
    placements: {
      average_package: "₹7,50,000",
      highest_package: "₹20,00,000",
    },
    ranking: 10,
    featured: false,
  },
  {
    name: "Parul University, Vadora",
    course_fees: 10000,
    user_reviews: 9.0,
    placements: {
      average_package: "₹9,00,000",
      highest_package: "₹30,00,000",
    },
    ranking: 3,
    featured: true,
  },
  {
    name: "IIT Bombay - Indian Institute of Technology - [IITB], Mumbai",
    course_fees: 20000,
    user_reviews: 8.0,
    placements: {
      average_package: "₹8,50,000",
      highest_package: "₹22,00,000",
    },
    ranking: 7,
    featured: false,
  },
  {
    name: "Madan Mohan Malaviya University of Technology -[MMM], Gorakhpur",
    course_fees: 18000,
    user_reviews: 7.5,
    placements: {
      average_package: "₹7,00,000",
      highest_package: "₹18,00,000",
    },
    ranking: 12,
    featured: false,
  },
  {
    name: "IIT Kharagpur - Indian Institute of Technology - [IITKGP], Kharagpur",
    course_fees: 16000,
    user_reviews: 8.2,
    placements: {
      average_package: "₹8,20,000",
      highest_package: "₹24,00,000",
    },
    ranking: 6,
    featured: true,
  },
  {
    name: "IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur",
    course_fees: 14000,
    user_reviews: 8.4,
    placements: {
      average_package: "₹8,40,000",
      highest_package: "₹23,00,000",
    },
    ranking: 8,
    featured: false,
  },
  {
    name: "IIT Roorkee - Indian Institute of Technology - [IITR], Roorkee",
    course_fees: 13000,
    user_reviews: 8.1,
    placements: {
      average_package: "₹8,10,000",
      highest_package: "₹22,00,000",
    },
    ranking: 9,
    featured: true,
  },
  {
    name: "IIT Guwahati - Indian Institute of Technology - [IITG], Guwahati",
    course_fees: 11000,
    user_reviews: 8.3,
    placements: {
      average_package: "₹8,30,000",
      highest_package: "₹21,00,000",
    },
    ranking: 11,
    featured: false,
  },
  {
    name: "IIT Hyderabad - Indian Institute of Technology - [IITH], Hyderabad",
    course_fees: 12500,
    user_reviews: 8.6,
    placements: {
      average_package: "₹8,60,000",
      highest_package: "₹26,00,000",
    },
    ranking: 4,
    featured: true,
  },
  {
    name: "BITS Pilani - Birla Institute of Technology and Science, Pilani",
    course_fees: 13500,
    user_reviews: 8.7,
    placements: {
      average_package: "₹8,70,000",
      highest_package: "₹27,00,000",
    },
    ranking: 2,
    featured: true,
  },
  {
    name: "IIIT Hyderabad - International Institute of Information Technology, Hyderabad",
    course_fees: 14500,
    user_reviews: 8.9,
    placements: {
      average_package: "₹8,90,000",
      highest_package: "₹28,00,000",
    },
    ranking: 1,
    featured: true,
  },
  // More colleges can be added here
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    setDisplayedColleges([]);
    setPage(1);
  }, [searchTerm, sortKey, sortOrder]);

  useEffect(() => {
    loadMoreColleges();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  const loadMoreColleges = () => {
    const filteredColleges = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortKey) {
      filteredColleges.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      });
    }

    const newColleges = filteredColleges.slice((page - 1) * 10, page * 10);
    setDisplayedColleges((prevColleges) => [...prevColleges, ...newColleges]);
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSort = (key) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <h1>College Information</h1>
      <input
        type="text"
        placeholder="Search by college name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>College Name</th>
            <th onClick={() => handleSort("course_fees")}>Course Fees</th>
            <th>Placement (Average / Highest)</th>
            <th onClick={() => handleSort("user_reviews")}>User Reviews</th>
            <th onClick={() => handleSort("ranking")}>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {displayedColleges.map((college, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td className="college-name">
                {college.featured && (
                  <span className="featured-label">Featured</span>
                )}
                {college.name}
                <div className="college-links">
                  <a href="#apply" className="apply-now">
                    Apply Now
                  </a>
                  <a href="#brochure" className="brochure">
                    Download Brochure
                  </a>
                  <label>
                    <input type="checkbox" />
                    Add to compare
                  </label>
                </div>
              </td>

              <td className="course-fees">
                ₹{college.course_fees.toLocaleString()}
                <br />
                <span>BE/B.tech</span>
                <br />
                <span>-1st year fees</span>
                <br />
                <span className="compare-fees-text">Compare fees</span>
              </td>
              <td className="package">
                <span className="fees">
                  {college.placements.average_package}
                </span>{" "}
                <br />
                <span className="text">Average Package</span>
                <br />
                <span className="fees">
                  {college.placements.highest_package}
                </span>
                <br />
                <span className="text">Highest Package</span>
                <br />
                <div>
                  <span className="placement">Compare Placements</span>
                </div>
              </td>
              <td>{college.user_reviews}/10</td>
              <td>{college.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={loader} className="loader">
        Loading more colleges...
      </div>
    </div>
  );
}

export default App;
