package proto

import (
	"bufio"
	"bytes"
	"encoding/binary"
)

//Encode 将消息解码
func Encode(msg string) ([]byte, error) {
	//读取消息的长度，转换为 int32(4个字节)
	length := int32(len(msg))
	var pkg = new(bytes.Buffer)
	//写入消息头, 即长度 4个字节
	err := binary.Write(pkg, binary.LittleEndian, length)
	if err != nil {
		return nil, err
	}
	//写入消息实体 后面的实体
	err = binary.Write(pkg, binary.LittleEndian, []byte(msg))
	if err != nil {
		return nil, err
	}
	return pkg.Bytes(), nil
}

//Decode 解码消息
func Decode(reader *bufio.Reader) (string, error) {
	//读取消息的长度
	lengthByte, _ := reader.Peek(4) //读取前4个字节的数据
	lengthBuff := bytes.NewBuffer(lengthByte)
	var length int32
	//将 lengthByte 读取 到 length中
	err := binary.Read(lengthBuff, binary.LittleEndian, &length)
	if err != nil {
		return "", err
	}
	//Buffered 返回缓冲中现有的可读字节数
	if int32(reader.Buffered()) < length+4 {
		return "", err
	}

	//读取真正的数据消息
	pack := make([]byte, int32(4+length))
	_, err = reader.Read(pack)
	if err != nil {
		return "", err
	}
	return string(pack[4:]),nil
}
