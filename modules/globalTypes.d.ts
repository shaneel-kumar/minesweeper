interface Coords {
  row: number;
  col: number;
}

interface BoardDimensions {
  width: number;
  height: number;
  difficulty?: string;
}

type State = string[][]