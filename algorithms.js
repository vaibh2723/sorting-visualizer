class Frame {
    constructor(e, h) {
        this.elements = [];
        this.highlights = [];
        this.information = "";

        if (e != undefined && e.length) {
            this.elements = e;
        }

        if (h != undefined && h.length) {
            this.highlights = h;
        }
    }
    addHighlights(highlights) {
        for (const e of highlights) {
            this.highlights.push(e);
        }
    }

    addElements(elements) {
        for (const e of elements) {
            this.elements.push(e);
        }
    }
}

class Animation {
    constructor() {
        this.frames = [];
    }

    addFrame(frame) {
        const temp = JSON.parse(JSON.stringify(frame)); // Only store a copy
        this.frames.push(temp);
    }

    getFrames() {
        return this.frames;
    }
}





class Algorithms {
    static bubble(e, order) {
        let elements = e;
        let solution = new Animation();
        let swapped = false;

        for (let i = 0; i < elements.length; ++i) {
            swapped = false;
            for (let j = 0; j < elements.length - 1; ++j) {
                solution.addFrame(new Frame([], [j, j + 1]));

                if (order == "desc" ? elements[j] < elements[j + 1] : elements[j] > elements[j + 1]) {
                    swapped = true;

                    const temp = elements[j];
                    elements[j] = elements[j + 1];
                    elements[j + 1] = temp;

                    solution.addFrame(new Frame([j, j + 1], [j, j + 1]));
                }
            }

            if (!swapped) {
                break;
            }
        }
        return solution;
    }

    static msort(e, order) {
        let element = e;
        let solution = new Animation();
        mergeSort(0, element.length - 1);

        function mergeSort(l, h) {
            if (h <= l) {
                return;
            }
            var middle = parseInt((l + h) / 2);
            mergeSort(l, middle)

            mergeSort(middle + 1, h)

            mergeArrays(l, middle, h)
            
        }

        function mergeArrays(l, m, h) {
            let i = l, j = m + 1;
            while (i <= m && j <= h) {
                solution.addFrame(new Frame([], [i, j]));
                if (order=="desc"?element[i] < element[j]:element[i]>element[j]) {
                    for (let k = i; k < j; k++) {
                        solution.addFrame(new Frame([k, j], []));
                        const temp = element[j];
                        element[j] = element[k];
                        element[k] = temp;
                        m++;
                    }
                    i++;
                    j++;
                    
                }
                else {
                    i++;
                    solution.addFrame(new Frame([], [i, j]));
                }
            }

            while (i <= m) {
                solution.addFrame(new Frame([i], [i]));
                i++;
            }
            while (j <= h) {
                solution.addFrame(new Frame([j], [j]));
                j++;
            }
                for(let ii = l;ii<=h;ii++){
                    console.log(element[ii])
                }
        }
        return solution

    }

    static quick(e,order){

        let elements = e;
        let solution = new Animation();

        quickSort(elements, 0, e.length - 1);

        function partition(elements, left, right) {
            var pivot   = elements[Math.floor((right + left) / 2)], 
            i = left, 
            j= right; 
            while (i <= j) {
                
                while (order=="desc"?(elements[i] > pivot):(elements[i] < pivot)) {
                    i++;
                    solution.addFrame(new Frame([], []));
                    console.log(i)
                }
                while (order=="desc"?(elements[j] < pivot):(elements[j] > pivot)) {
                    j--;
                    solution.addFrame(new Frame([], []));
                    console.log(i)
                }
                if (i <= j) {
                    swap(elements, i, j);
                    i++;
                    j--;
                }
            }
            return i;
        }

        function quickSort(e, left, right) {
            var index;
            if (e.length > 1) {
                index = partition(e, left, right);
                if (left < index - 1) {
                    quickSort(e, left, index - 1);
                }
                if (index < right) {
                    quickSort(e, index, right);
                }
            }
        }

        function swap(items, l, r){
            var temp = items[l];
            items[l] = items[r];
            items[r] = temp;
            solution.addFrame(new Frame([l, r],[]));
        }
        return solution;
    }

    static insertion(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 1; i < elements.length; ++i) {
            let key = elements[i];
            let j = i - 1;

            solution.addFrame(new Frame([], [j, j + 1]));

            while (j >= 0 && (order == "desc" ? elements[j] < key : elements[j] > key)) {
                solution.addFrame(new Frame([], [j, j + 1]));
                elements[j + 1] = elements[j];
                solution.addFrame(new Frame([j, j + 1], [j, j + 1]));

                j = j - 1;
            }
            elements[j + 1] = key;
        }

        return solution;
    }

    static selection(e, order) {
        let elements = e;
        let solution = new Animation();

        for (let i = 0; i < elements.length - 1; ++i) {
            let current = i;

            solution.addFrame(new Frame([], [i, current]));

            let j = 0;
            for (j = i + 1; j < elements.length; ++j) {
                solution.addFrame(new Frame([], [i, j, current]));

                if (order == "desc" ? elements[j] > elements[current] : elements[j] < elements[current]) {
                    current = j;
                }
            }

            const temp = elements[current];
            elements[current] = elements[i];
            elements[i] = temp;

            solution.addFrame(new Frame([i, current], [j, current]));
        }

        return solution;
    }
    static heap(e, order) {
        let elements = e;
        const n = e.length;
        let solution = new Animation();

        for (let i = parseInt(n / 2) - 1; i >= 0; --i) {
            heapify(elements, n, i, solution, order);
        }

        for (let i = n - 1; i >= 0; --i) {
            const temp = elements[0];
            elements[0] = elements[i];
            elements[i] = temp;

            solution.addFrame(new Frame([0, i], [0, i]));

            heapify(elements, i, 0, solution, order);
        }

        function heapify(elements, n, i, solution, order) {
            let current = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && (order == "asc" ? elements[left] > elements[current] : elements[left] < elements[current])) {
                current = left;
            }

            if (right < n && (order == "asc" ? elements[right] > elements[current] : elements[right] < elements[current])) {
                current = right;
            }

            solution.addFrame(new Frame([], [current, i]));

            if (current != i) {
                const temp = elements[i];
                elements[i] = elements[current];
                elements[current] = temp;
                solution.addFrame(new Frame([current, i], [current, i]));

                heapify(elements, n, current, solution, order);
            }
        }

        return solution;
    }
}
