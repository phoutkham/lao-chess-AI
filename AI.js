class AI {
  constructor(PiecesValue) {
    this.event = [];
    this.gameObject = [];
    this._board = 0;
    this._side = 0;
    this.pawnValue = PiecesValue[PAWN];
    this.kingValue = PiecesValue[KING];
    this.decisionTree = 0;
  }

  addEventListener(eventName, callback, gameObject) {
    this.event[eventName] = callback;
    this.gameObject[eventName] = gameObject;
  }

  getMove(side, board) {
    this.decisionTree = new CTreeDecision({
      rating: 0,
      moves: [],
      depth: 0
    });
    this._board = board;
    this._side = side;
    this.startComputing(side);
  };

  startComputing(side) {
    const result = this.maxi(0, side);
    this.onEndComputing(result);
  };

  getBestNode(node) {
    if (0 < node.length) {
      for (var l = node[0].model.rating, m = 1; m < node.length; m++) node[m].model.rating > l && (l = node[m].model.rating);
      var bestNode = [];
      for (m = 0; m < node.length; m++) node[m].model.rating === l && bestNode.push(node[m]);
      node = bestNode[Math.floor(Math.random() * bestNode.length)].model.moves;
    } else {
		node = null;
	}
    return node;
  };

  onEndComputing(result) {
    result = this.decisionTree.getNode(result, 1);
    _addDistanceValue(result, this._board, this._side);
    result = this.getBestNode(result);
    this.event[ON_END_AI_COMPUTATION] && this.event[ON_END_AI_COMPUTATION].call(this.gameObject[ON_END_AI_COMPUTATION], result);
  };

  findAllMoves(side) {
    return s_oMovesController.getAllMovesInfoInBoard(side, this._board);
  };

  maxi(min, side) {
    if (min === SEARCH_DEPTH) return evaluateBoard(this._board, side, this.pawnValue, this.kingValue, this._side);

    let max = -INFINITE;
    const legalMove = this.findAllMoves(side);
    const opponentPices = s_oBoardStateController.getOtherOpponent(side);
    const _min = min + 1;

    for (let r = 0; r < legalMove.length; r++) {
      const _legalMove = legalMove[r];

      _makeMove(_legalMove, this._board);
      this.decisionTree.initNewNode(_min);

      const mini = this.mini(_min, opponentPices);

      this.decisionTree.addNode(min, mini, _legalMove);
      _unmakeMove(_legalMove, this._board);
      mini > max && (max = mini);
    }

    return max;
  };

  mini(min, side) {
    if (min === SEARCH_DEPTH) return evaluateBoard(this._board, side, this.pawnValue, this.kingValue, this._side);

    let max = INFINITE;
    const legalMove = this.findAllMoves(side);
    const opponentPices = s_oBoardStateController.getOtherOpponent(side);
    const _max = min + 1;

    for (let r = 0; r < legalMove.length; r++) {
      const _legalMove = legalMove[r];

      _makeMove(_legalMove, this._board);
      this.decisionTree.initNewNode(_max);

      const bestmove = this.maxi(_max, opponentPices);

      this.decisionTree.addNode(min, bestmove, _legalMove);
      _unmakeMove(_legalMove, this._board);
      bestmove < max && (max = bestmove);
    }

    return max;
  };
}