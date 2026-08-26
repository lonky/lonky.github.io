import asyncio
from pyscript import document

document.querySelector("#loading").style.display = "none"

WIDTH = 16
HEIGHT = 16


def set_diehard():
    canvas = [[0 for _ in range(WIDTH)] for _ in range(HEIGHT)]

    canvas[5][2] = 1
    canvas[5][3] = 1
    canvas[6][3] = 1

    canvas[4][8] = 1
    canvas[6][7] = 1
    canvas[6][8] = 1
    canvas[6][9] = 1

    return canvas


def draw_canvas(canvas, frame):
    text = f"\nFRAME: {frame}\n\n"

    text += "   "
    for x in range(WIDTH):
        text += f"{x % 10} "

    text += "\n"

    for y, row in enumerate(canvas):
        text += f"{y:2} "

        for cell in row:
            if cell:
                text += "█ "
            else:
                text += "· "

        text += "\n"
    text += "\n"
    document.querySelector("#result").innerText = text


def check_neighbours(canvas):
    new_canvas = [
        [0 for _ in range(WIDTH)]
        for _ in range(HEIGHT)
    ]

    height = len(canvas)
    width = len(canvas[0])

    for y in range(height):
        for x in range(width):

            neighbours = 0

            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):

                    if dx == 0 and dy == 0:
                        continue

                    ny = (y + dy) % height
                    nx = (x + dx) % width

                    neighbours += canvas[ny][nx]

            if canvas[y][x] == 1:
                if neighbours in (2, 3):
                    new_canvas[y][x] = 1
            else:
                if neighbours == 3:
                    new_canvas[y][x] = 1

    return new_canvas


async def main():
     while True:
        canvas = set_diehard()

        for frame in range(1, 141):
            draw_canvas(canvas, frame)

            canvas = check_neighbours(canvas)

            await asyncio.sleep(0.1)

await main()
