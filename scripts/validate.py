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

    return sympy.simplify(expected) == sympy.simplify(actual)

if len(sys.argv) != 3:
    print("Usage: python validate.py <expected> <actual>")
    exit(1)

print(is_same(sys.argv[1], sys.argv[2]))
