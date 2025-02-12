# Potato-Kingdom
JavaScript assignment 3rd semester Potato Kingdom game
Mapmaker - The Imperial Cartographer

📜 Description

In the neighboring land of Neverfindland, the mighty Potato Empire remains largely uncharted. Under the rule of Empress French Frie, you are tasked with mapping the unknown regions by strategically placing different terrain elements on an 11x11 grid. Your goal is to maximize points by fulfilling the Empress's missions while working within a 28-time-unit limit.

🎮 Gameplay Overview

The game is turn-based and lasts 28 time units.

You place terrain elements (Forest, Village, Farm, Water) on the grid.

Each terrain element has a shape, can be rotated and mirrored.

Some grid cells contain mountains that cannot be covered.

Every placed element consumes 1 or 2 time units.

The game ends when the total time reaches 28 units.

🗺️ Map and Placement Rules

The map is 11x11 and starts empty, except for 5 fixed mountains at:

(2,2), (4,9), (6,4), (9,10), (10,6)

Terrain cannot be placed outside the grid or over mountains.

🏆 Scoring System

At the beginning of the game, 4 random mission cards (A, B, C, D) are selected. Each mission has different objectives, such as:

Edge of the Forest – 1 point for each forest tile adjacent to the edge.

Watering Potatoes – 2 points for each water tile next to a farm.

Borderlands – 6 points for each full row or column.

Magicians' Valley – 3 points for each water tile next to a mountain.

Seasons & Scoring Rounds

The 28-time-unit gameplay is split into 4 seasons (7 units each). Missions are scored at the end of each season:

Spring → Score Missions A & B

Summer → Score Missions B & C

Autumn → Score Missions C & D

Winter → Score Missions D & A

At the end of the game, seasonal scores are summed to determine the final result.

🚀 Features

Randomized terrain elements for dynamic gameplay.

Rotatable and mirrorable pieces to fit into the grid optimally.

Mission-based scoring system for strategic depth.

Seasons with alternating mission evaluations.

Various bonus missions for extra points, such as:

Tree Line – Longest vertical forest line.

Rich Countryside – Rows with 5 different terrain types.

Odd Numbered Silos – Full odd-numbered columns.

🛠️ Technologies Used

JavaScript (Core game logic)

HTML & CSS (User interface)
