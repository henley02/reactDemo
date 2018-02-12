import React from 'react';
import {Row, Col, Form, Button, Card, Input} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

class CommonComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: '',
        }
    }

    componentDidMount() {
        var myFetchOption = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json});
            });
    }

    handleSubmit() {
        e.preventDefault();
        var myFetchOption = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldValue();

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&comment=" + formData.remark, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.componentDidMount();
            });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;

        const commentList = comments.length ?
            comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href="#">发表于 {comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '没有加载到任何评论';

        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label={"您的评论"}>
                                <TextArea type="textarea"
                                       placeholder="随便写" {...getFieldDecorator('remark', {initialVal: ''})}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);