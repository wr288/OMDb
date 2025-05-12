{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function saveApiKey() \{\
  const key = document.getElementById('apiKeyInput').value;\
  if (key) \{\
    sessionStorage.setItem('omdbKey', key);\
    document.getElementById('api-key-section').style.display = 'none';\
    document.getElementById('search-section').style.display = 'block';\
  \} else \{\
    alert('Please enter your API key.');\
  \}\
\}\
\
async function searchMovie() \{\
  const apiKey = sessionStorage.getItem('omdbKey');\
  const movieName = document.getElementById('movieInput').value;\
  const resultsDiv = document.getElementById('results');\
  resultsDiv.innerHTML = 'Loading...';\
\
  if (!apiKey) \{\
    resultsDiv.innerHTML = 'API key missing!';\
    return;\
  \}\
  if (!movieName) \{\
    resultsDiv.innerHTML = 'Please enter a movie name!';\
    return;\
  \}\
\
  try \{\
    const response = await fetch(`https://www.omdbapi.com/?apikey=$\{apiKey\}&s=$\{encodeURIComponent(movieName)\}`);\
    const data = await response.json();\
\
    if (data.Response === "False") \{\
      resultsDiv.innerHTML = data.Error;\
      return;\
    \}\
\
    resultsDiv.innerHTML = '';\
    data.Search.forEach(movie => \{\
      resultsDiv.innerHTML += `\
        <div class="movie-card">\
          <img src="$\{movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image'\}" alt="Poster">\
          <div>\
            <strong>$\{movie.Title\}</strong> ($\{movie.Year\})<br>\
            Type: $\{movie.Type\}\
          </div>\
        </div>\
      `;\
    \});\
  \} catch (err) \{\
    resultsDiv.innerHTML = 'Error fetching data.';\
  \}\
\}\
\
// If key is already saved, show search section\
if (sessionStorage.getItem('omdbKey')) \{\
  document.getElementById('api-key-section').style.display = 'none';\
  document.getElementById('search-section').style.display = 'block';\
\}\
}