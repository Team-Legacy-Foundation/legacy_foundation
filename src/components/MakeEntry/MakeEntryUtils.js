export function getGpaSliderMarks() {
    return [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(i => ({ value: i, label: i.toString()}));
}
