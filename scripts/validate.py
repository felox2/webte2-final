import sys
import traceback
import sympy
from sympy.parsing.latex import parse_latex

def is_same(x, y):
    try:
        expected = parse_latex(x)
        actual = parse_latex(y)
    except Exception as e:
        print("Error parsing LaTeX:", e)
        traceback.print_exc()
        exit(1)

    a = sympy.nsimplify(expected, tolerance=0.0001, rational=True)
    b = sympy.nsimplify(actual, tolerance=0.0001, rational=True)

    a = sympy.simplify(a)
    b = sympy.simplify(b)

    return a == b

if len(sys.argv) != 3:
    print("Usage: python validate.py <expected> <actual>")
    exit(1)

print(is_same(sys.argv[1], sys.argv[2]))
