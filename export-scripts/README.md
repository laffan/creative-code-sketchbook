# Exporting

## Exporting Videos

-Video from a series of stills

`ffmpeg -r 30 -f imsage2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4`

- Compress.mov --> iOS-safe .mp4 

`ffmpeg -i comp.mov -vcodec mpeg4 -vb 8000k -strict experimental -qscale 0 output-instagram.mp4`


- Generate GIF

```bash
# Generate Palette
ffmpeg -ss 5.0 -t 5 -i output.mp4 -filter_complex "[0:v] palettegen" palette.png

# Create Gif
ffmpeg -ss 5.0 -t 5 -i output.mp4 -filter_complex "[0:v] fps=12,scale=480:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" output.gif
```




## Thanks
Gif export script thanks to https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/