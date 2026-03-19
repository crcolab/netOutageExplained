# Sequence — Scene 1: Event Timeline

All events ordered by scroll progress (0.0 = top, 1.0 = bottom).

```
0.000  Scene begins — wide shot, ambient trains loop
0.030  Step 0 text active
0.060  Camera: easeInOut zoom to You (1F)
0.065  Highlight pulse begins on You
0.100  Step 1 text active
0.120  Camera: easeInOut pan to Friend (B1)
0.125  Highlight pulse begins on Friend
0.130  Speech bubble fades in (crying emoji, bouncing)
0.150  Step 2 text active
0.190  Speech bubble fades out
0.200  Camera: easeInOut zoom to Your phone
0.200  Phone glow intensifies
0.220  Step 3 text active
0.250  Packets begin spawning (staggered, 5 total)
0.270  Step 4 text active
0.280  Camera: begins tracking lead packet (zoom 3.5)
0.350  DRAMATIC MRT train enters (scroll-driven, R→L)
0.400  Step 5 text active
0.450  MRT train exits frame; packets descending
0.520  DRAMATIC THSR train enters (scroll-driven, L→R)
0.600  THSR train exits frame
0.650  Camera: easeInOut to Friend's phone (zoom 4.0)
0.650  Friend's phone glow intensifies
0.660  Step 6 text active
0.700  Camera: easeInOut zoom out to wide
0.750  All packets have arrived
0.780  Full wide shot restored
0.800  Dim overlay begins fading in
0.850  Step 7 text active
0.900  "...or is it?" text fades in (red)
1.000  Scene ends — maximum dim
```

## Train Timing Detail

### Ambient Trains
- Active when camera zoom < 2.5
- MRT: 4-second loop, right-to-left
- THSR: 3-second loop, left-to-right

### Dramatic Trains (scroll-driven)
- MRT: progress 0.35–0.45, right-to-left, synced to scroll
- THSR: progress 0.52–0.60, left-to-right, synced to scroll
- Draw order: after building, before packets (packets appear in front)

## Camera Tracking Detail

During progress 0.28–0.65, the camera tracks the lead packet position:
- `cam.x` = lead packet x
- `cam.y` = lead packet y
- `cam.zoom` = 3.5
- Smooth transition into/out of tracking mode via keyframe interpolation
