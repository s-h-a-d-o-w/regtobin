# regtobin

A Node.js script to convert the content of a binary key that was exported from the 
Windows registry to an actual binary file.
(One use case: Construct a DSDT dump that can be compiled to something human-readable 
[using `iasl`](https://01.org/linux-acpi/utilities).)

## Usage

```
node . something.reg
```

Will write the binary data to `something.bin`.

## Implementation details

In case the .reg file format should ever change - these assumptions are being made:
- UCS-2 encoding
- "hex:" indicates the start of the content
- Bytes are separated by ","
