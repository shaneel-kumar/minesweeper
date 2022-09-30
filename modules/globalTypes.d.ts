interface Coords {
  row: number;
  col: number;
}

interface BoardDimensions {
  width: number;
  height: number;
  difficulty?: string;
  mines?: number
}

type State = string[][]