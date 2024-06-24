# LAO CHESS AI
This project implements a lao chess AI using the Minimax algorithm and decision tree. The AI evaluates board positions and makes moves based on a scoring system that values pawns and their potential promotion.

## Introduction
This AI project aims to create a competitive AI for the game of chess. It utilizes the Minimax algorithm, enhanced with alpha-beta pruning, to decide the best move by evaluating possible future game states. Additionally, a decision tree is used to handle complex decision-making processes within the game.

# Algorithm Details
## Minimax Algorithm
The Minimax algorithm is a recursive method for choosing the best move in a two-player game. The algorithm simulates all possible moves from the current position and selects the move that maximizes the player's advantage while minimizing the opponent's.

## Decision Tree
A decision tree is used to further enhance the AI's decision-making process. This allows the AI to handle more complex scenarios and make more informed decisions.

## Scoring System
The AI evaluates board positions using a custom scoring system:

- Pawn Value: 1.2 points
- Pawn Promotion: 2.6 points
The scoring system is designed to prioritize both immediate gains and long-term strategic advantages. Pawns are valued at 1.2 points, and getting a pawn to a promotion square (where it becomes a king) is valued at an additional 2.6 points.

## Depth Limit
![depthlimit](png/depth limit.png)
- The algorithm's depth limit specifies the number of turns to look ahead in the game tree. The number of moves possible become exponentially greater after each turn, as presented by the visual. This poses a limit to how deep we can search a game tree while playing in real time, so we have to set a depth limit. 

- For example, if there are 10 possible moves each player can make each turn, all 10 of those moves would need to be explored if we're not using alpha-beta pruning. At a depth level of 3 that adds up to 10^3 total moves, regardless of whether or not they actually improve the player's score. This idea is visually represented in the nested tree where each branch from the root creates its own tree. A smaller example with 3 possible moves and 3 turns is represented on the right. Notice how the third turn had 3^3=9 possible moves.

- The benefit of increasing the depth limit is that we can better see all the possible ways the opponent can make winning moves. We are always assuming that plays are made (during the opponents turn) in the opponent's best interest. But if we have a search depth of 1, then we can only see moves that directly help the opponent in the next turn. However, say if our depth limit is 5 (we can see 5 moves ahead), we can view setups that the opponent could potentially make that help them maximize their score later on. We always want to increase the depth limit as much as we can to see the opponent's possible counter-strategy.
